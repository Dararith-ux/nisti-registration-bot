import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import registerRoutes from './routes/registerRoutes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect MongoDB once at server startup.
await connectDB();

// Allow frontend Mini App origin and local development.
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*'
  })
);

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Backend is running.' });
});

app.use('/api', registerRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
