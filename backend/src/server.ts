import express, { Request, Response } from 'express';
const cors = require("cors");
//import {router} from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(router);


app.get('/', (req: Request, res: Response) => {
    res.send('hello friend');
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
