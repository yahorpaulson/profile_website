"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const uri = process.env.MONGO_URI;
const client = new mongodb_1.MongoClient(uri);
const dbName = 'portfolio';
let projectsCollection;
if (!uri) {
    throw new Error('[ERROR]: Password not set or wrong');
}
client.connect().then(() => {
    const db = client.db(dbName);
    projectsCollection = db.collection('projects');
    console.log('[SUCCESS]: Connected to MongoDB in /routes/projects');
}).catch(err => {
    console.error('[ERROR]: Failed to connect to to MongoDB in /routes/projects', err);
});
router.get('/', async (req, res) => {
    try {
        const projects = await projectsCollection.find().toArray();
        res.json(projects);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching projects', error: err });
    }
});
router.get('/:slug', async (req, res) => {
    try {
        console.log('GET', req.params.slug);
        const project = await projectsCollection.findOne({ slug: req.params.slug });
        res.status(200).json(project);
    }
    catch (err) {
        res.status(500).json({ message: '[ERROR]: Error fetching project' });
    }
});
exports.default = router;
