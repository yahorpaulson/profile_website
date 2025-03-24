import { Router, Request, Response } from 'express';
import { Project } from '@shared/modules/project';
import { Collection, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);
const dbName = 'portfolio';

let projectsCollection: Collection<Project>;

if (!uri) {
    throw new Error('❌ MONGO_URI is not defined in .env file');
}




client.connect().then(() => {
    const db = client.db(dbName);
    projectsCollection = db.collection<Project>('projects');
    console.log('[SUCCESS]: Connected to MongoDB in /routes/projects');
}).catch(err => {
    console.error('[ERROR]: Failed to connect to to MongoDB in /routes/projects');
})

export default router;