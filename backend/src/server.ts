import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import projectRouter, { setCollections } from './routes/projects'

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

async function startServer() {
    try {


        const connection = await client.connect()
        if (!connection) {
            throw new Error('[FATAL]: Failed to connect to MongoDB')

        }
        const db = client.db('portfolio')
        console.log('[SUCCESS]: Connected to MongoDB')

        setCollections(db, JWT_SECRET as string) //JWT_SECRET is transfered to projects.ts


        app.use('/api/projects', projectRouter)

        app.listen(PORT, '0.0.0.0', () =>
            console.log(`[READY]: Server running on http://localhost:${PORT}`)
        )
    } catch (err) {
        console.error('[FATAL]: Failed to start server:', err)
    }
}

startServer()
