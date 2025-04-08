import { Router, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

dotenv.config();

import { Collection, MongoClient } from 'mongodb';


import { Project } from 'src/shared/modules/project';


const router = Router();

const uri = process.env.MONGO_URI!;
const secret = process.env.JWT_SECRET!;







if (!uri) {
    throw new Error('[ERROR]: Password not set or wrong');
}

const client = new MongoClient(uri);
const dbName = 'portfolio';

let projectsCollection: Collection<Project>;
let adminCollection: Collection<{ name: string; password: string }>;




type Lang = 'en' | 'de' | 'be';

client.connect().then(() => {
    const db = client.db(dbName);
    projectsCollection = db.collection<Project>('projects');
    adminCollection = db.collection<{ name: string; password: string }>('admins');
    console.log('[SUCCESS]: Connected to MongoDB');

}).catch(err => {
    console.error('[ERROR]: Failed to connect to MongoDB', err);
})


export function validateProject(project: any): string[] {
    const errors: string[] = [];

    if (!project.slug || typeof project.slug !== 'string') {
        errors.push('Slug is required');
    }


    if (!project.title || typeof project.title !== 'object') {
        errors.push('Title is required');
    } else {
        for (const lang of ['en', 'de', 'be'] as Lang[]) {
            if (typeof project.title[lang] !== 'string') {
                errors.push(`Title in "${lang}" must be a string`);
            }
        }
    }


    if (!project.description || typeof project.description !== 'object') {
        errors.push('Description is required');
    }


    if (!project.shortDescription || typeof project.shortDescription !== 'object') {
        errors.push('ShortDescription is required');
    }

    /** 
    if (typeof project.inProgress !== 'boolean') {
        errors.push('inProgress must be a boolean');
    }
    */


    if (project.tags && !Array.isArray(project.tags)) {
        errors.push('Tags must be an array of strings');
    }


    for (const field of ['goals', 'insights']) {
        const value = project[field];
        if (value) {
            for (const lang of ['en', 'de', 'be'] as Lang[]) {
                if (!Array.isArray(value[lang])) {
                    errors.push(`${field}["${lang}"] must be an array of strings`);
                }
            }
        }
    }

    return errors;
}





function verifyToken(req: Request, res: Response, next: () => void): void {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: '[ERROR]: No token provided' });
        return;
    }
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({ message: '[ERROR]: Invalid token' });
            return;
        }
        req.body.user = decoded;
        next();
    });
}

function getCollection(): Collection<Project> {
    if (!projectsCollection) {
        throw new Error('[ERROR]: DB not initialized yet');
    }
    return projectsCollection;
}








router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const collection = getCollection();
        const projects = await collection.find().toArray();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching projects', error: err });
    }
});



router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('GET', req.params.slug);
        const project = await projectsCollection.findOne({ slug: req.params.slug });

        res.status(200).json(project);


    } catch (err) {
        res.status(500).json({ message: '[ERROR]: Error fetching project' });
    }
})

router.post('/admin/login', async (req: Request, res: Response): Promise<void> => {
    try {
        if (!secret) {
            res.status(500).json({ message: '[ERROR]: JWT secret not set' });
            return;
        }

        console.log('[DEBUG]: login route hit');

        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: '[ERROR]: Username and password are required' });
            return;
        }

        const admin = await adminCollection.findOne({ name: username });
        if (!admin) {
            res.status(401).json({ message: '[ERROR]: Admin not found' });
            return;
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            res.status(401).json({ message: '[ERROR]: Invalid password' });
            return;
        }


        const token = jwt.sign({ username: admin.name }, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.json({ token });

    } catch (err) {
        console.error('[ERROR]: Login error', err);
        res.status(500).json({ message: '[ERROR]: Internal server error' });
    }
});





router.delete('/admin/:slug', verifyToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const slug = req.params.slug;
        if (!slug) {
            res.status(400).json({ message: '[ERROR]: Slug is required' });
            return;
        }
        const collection = getCollection();
        await collection.deleteOne({ slug });
        res.status(200).json({ message: '[SUCCESS]: Project deleted' });

    } catch (err) {
        res.status(500).json({ message: '[ERROR]: Error admin DELETE request' });
    }
})

router.post('/admin', async (req: Request, res: Response): Promise<void> => {
    try {
        const project = req.body as Project;
        const errors = validateProject(project);
        if (errors.length > 0) {
            res.status(400).json({ message: '[ERROR]: Validation failed', errors });
            return;
        }

        const collection = getCollection();
        await collection.insertOne(project);
        res.status(201).json({ message: '[SUCCESS]: Project created' });
    }
    catch (err) {
        res.status(500).json({ message: '[ERROR]: Error creating project' });
    }
}
)

export default router;