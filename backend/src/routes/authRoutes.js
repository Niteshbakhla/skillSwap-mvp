import express from 'express';
import { signup, login, getProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authentication.js';


const router = express.Router();

// Auth routes
router.route("/signup").post(signup)
router.route("/login").post(login)

// Optional: get current user profile
router.route("/me").get(protect, getProfile)

export default router;
