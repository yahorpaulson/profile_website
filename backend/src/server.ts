import express, { Request, Response } from 'express';
import cors from "cors";
import projectsRouter from './routes/projects';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(router);


app.get('/', (req: Request, res: Response) => {
    res.send('hello friend');
});

app.use('/api/projects', projectsRouter);

app.get("/ip-check", async (req, res) => {
    const response = await fetch("https://api.ipify.org?format=json");
    const ip = await response.json();
    res.send(ip);
});




const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

