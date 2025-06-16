import dotenv from 'dotenv';
dotenv.config({
    path: './env'
})
import express, { urlencoded } from "express";
import cors from "cors";
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import captainRoutes from './routes/captain.routes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.get('/',(req,res)=>{
res.send('hello world')
});
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
export {app};