import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// Connect to MongoDB (for Vercel, we need to handle this differently)
let isConnected = false;

const connectToDB = async () => {
    if (!isConnected) {
        try {
            await connectDB();
            isConnected = true;
            console.log('✅ MongoDB connected successfully');
        } catch (error) {
            console.error('❌ MongoDB connection error:', error);
        }
    }
};

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("✅ API Working");
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.post('/api/webhooks/clerk', async (req, res) => {
    try {
        await connectToDB(); // Connect to DB before handling webhook
        await clerkWebhooks(req, res);
    } catch (error) {
        console.error('Webhook route error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, async () => {
        await connectToDB();
        console.log(`🚀 Server is running on port ${PORT}`);
    });
}

// Export for Vercel (this is required for serverless functions)
export default app;