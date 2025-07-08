import express from 'express';
import { clerkWebhooks } from '../controllers/UserController.js';
import { use } from 'react';

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhooks);

export default userRouter;
