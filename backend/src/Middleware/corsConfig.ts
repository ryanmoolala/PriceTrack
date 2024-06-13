import cors from "cors";

const corsEnable = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true 
}

export default cors(corsEnable);