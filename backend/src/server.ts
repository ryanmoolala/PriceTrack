// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from 'express';
import cors from 'cors';


// Create an Express application
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // allow only this origin to access resources
    methods: ['GET', 'POST'], // allow only these methods
    allowedHeaders: ['Content-Type'], // allow only these headers
    credentials: true // allow cookies to be sent
  }));

const port: number = 5001;

app.get('/api/test', (req: Request, res: Response) => {
    res.send('Hello TEST BACKEND')
})

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});