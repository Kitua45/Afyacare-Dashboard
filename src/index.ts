import express from 'express'
import sql from 'mssql';
import dotenv from 'dotenv';
import { getPool } from './db/config.js';


//create express app
const app = express();

//config dotenv - load env variables
dotenv.config();

//middleware
app.use(express.json()); //parse json request body


//Root route
app.get('/', (_, res) => {
    res.send("Hello, express API is running...");
});

const port =3000
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:{port}`);

})

getPool()
.then(() => console.log("Database connected successfully"))
.catch((err: any) => console.log("Database connection failed", err))