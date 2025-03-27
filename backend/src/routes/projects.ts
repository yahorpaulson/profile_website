import { Router, Request, Response } from 'express';

import { Collection, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { Project } from '../../shared/modules/project';

dotenv.config();

const router = Router();

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);
const dbName = 'portfolio';

let projectsCollection: Collection<Project>;

if (!uri) {
    throw new Error('[ERROR]: Password not set or wrong');
}




client.connect().then(() => {
    const db = client.db(dbName);
    projectsCollection = db.collection<Project>('projects');
    console.log('[SUCCESS]: Connected to MongoDB in /routes/projects');
}).catch(err => {
    console.error('[ERROR]: Failed to connect to to MongoDB in /routes/projects', err);
})




router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await projectsCollection.find().toArray();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching projects', error: err });
    }
})





router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('GET', req.params.slug);
        const project = await projectsCollection.findOne({ slug: req.params.slug });

        res.status(200).json(project);


    } catch (err) {
        res.status(500).json({ message: '[ERROR]: Error fetching project' });
    }
})

export default router;