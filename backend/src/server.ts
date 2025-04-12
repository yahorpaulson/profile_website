
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { MongoClient, Db } from 'mongodb'
import projectRouter, { setCollections } from './routes/projects'
import { Collection } from 'mongodb'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = parseInt(process.env.PORT || '3000', 10)
const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET
//I want to keep them together without initialising them in different modules

if (!MONGO_URI || !JWT_SECRET) {
    throw new Error('[FATAL]: Missing env variables')
}

const client = new MongoClient(MONGO_URI)

let feedbackCollection: Collection<{ message: string; mark: number; time: Date }>;






async function startServer() {
    try {


        const connection = await client.connect()
        if (!connection) {
            throw new Error('[FATAL]: Failed to connect to MongoDB')

        }
        const db = client.db('portfolio')
        console.log('[SUCCESS]: Connected to MongoDB')

        setCollections(db, JWT_SECRET as string) //JWT_SECRET is transfered to projects.ts


        feedbackCollection = db.collection('feedback');


        app.use('/api/projects', projectRouter)

        app.post('/api/feedback', async (req: Request, res: Response) => {
            const { message, mark, time } = req.body


            try {

                console.log('Feedback received:', { message, mark, time })

                const result = await feedbackCollection.insertOne({
                    message,
                    mark,
                    time: time ? time : new Date()
                })
                res.status(200).json({ message: '[SUCCESS]: Feedback sent', result });
            } catch (err) {
                console.error('[ERROR]: Failed to send feedback', err);
                res.status(500).json({ message: '[ERROR]: Failed to send feedback' });
            }

        })



        app.listen(PORT, '0.0.0.0', () =>
            console.log(`[READY]: Server running on http://localhost:${PORT}`)
        )
    } catch (err) {
        console.error('[FATAL]: Failed to start server:', err)
    }
}

startServer()
