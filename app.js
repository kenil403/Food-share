import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRoutes from "./routes/userRoutes.js"
import hotelsRoutes from "./routes/hotelsRoutes.js"
import volunteerRoutes from "./routes/volunteerRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import woLoginRoutes from "./routes/woLoginRoutes.js"
import communityRoute from "./routes/community.route.js"
const app = express();
dotenv.config();

app.use('/uploads', express.static('uploads'));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',woLoginRoutes);
app.use('/community',communityRoute);
app.use('/user', userRoutes);
app.use('/hotels', hotelsRoutes);
app.use('/volunteer', volunteerRoutes);
app.use('/admin', adminRoutes);

dbConnection();

app.use(errorMiddleware);

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})