import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRoutes from "./routes/userRoutes.js"
import hotelsRoutes from "./routes/hotelsRoutes.js"
import volunteerRoutes from "./routes/volunteerRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import woLoginRoutes from "./routes/woLoginRoutes.js"
import communityRoute from "./routes/community.route.js"

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS configuration
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));

// Body parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/',woLoginRoutes);
app.use('/community',communityRoute);
app.use('/user', userRoutes);
app.use('/hotels', hotelsRoutes);
app.use('/volunteer', volunteerRoutes);
app.use('/admin', adminRoutes);

// Database connection
dbConnection();

// Error middleware (must be last)
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;