import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authentication.js';


const router = express.Router();

// Get logged-in user's profile
router.route("/profile").get(protect, getProfile);

export default router;
