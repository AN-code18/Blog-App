import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Router from './routes/route.js';
import Connection from './database/db.js';
import Dotenv from 'dotenv';
const app = express();
Dotenv.config();
app.use(cors())
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/' , Router);

if(process.env.NODE_ENV === 'production'){
 app.use(express.static('client/build'));
}
const PORT = process.env.PORT ||  8000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

const url='mongodb+srv://Anisha222:qwertyuiop23@blog1.eexpz.mongodb.net/BLOG?retryWrites=true&w=majority';

Connection(process.env.MONGODB_URI || url);