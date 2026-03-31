import express from 'express';
import { createRegistration } from '../controllers/registerController.js';

const router = express.Router();

// POST /api/register
router.post('/register', createRegistration);

export default router;
