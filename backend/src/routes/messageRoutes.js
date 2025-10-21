import express from 'express';
import { protect } from '../middlewares/authentication.js';

import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.use(protect); // All message routes are protected

router.route("/").post(sendMessage);
router.route("/:matchId").get(getMessages);

export default router;
