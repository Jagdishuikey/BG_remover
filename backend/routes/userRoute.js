import express from 'express';
import { clerkWebhooks } from '../controllers/UserController.js';
import userModel from '../models/userModel.js';
import { Clerk } from "@clerk/clerk-js";
const clerk = new Clerk("YOUR_CLERK_PUBLISHABLE_KEY");


clerk.load().then(() => {
  const user = clerk.user;
  console.log(user.id); // This is the Clerk ID
});

const userRouter = express.Router();

userRouter.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks);
userRouter.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    const createdUser = await userModel.create(userData);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default userRouter;
