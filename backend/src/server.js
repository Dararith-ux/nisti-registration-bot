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

const allowedOrigins = (process.env.FRONTEND_URL || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map((origin) => origin.replace(/\/+$/, ''));

const corsOptions = allowedOrigins.includes('*')
  ? { origin: '*' }
  : {
      origin: (requestOrigin, callback) => {
        if (!requestOrigin) {
          callback(null, true);
          return;
        }

        const normalizedOrigin = requestOrigin.replace(/\/+$/, '');
        if (allowedOrigins.includes(normalizedOrigin)) {
          callback(null, true);
          return;
        }

        callback(new Error('CORS blocked for this origin'));
      }
    };

// Connect MongoDB once at server startup.
await connectDB();

// Allow frontend Mini App origin and local development.
app.use(cors(corsOptions));

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
