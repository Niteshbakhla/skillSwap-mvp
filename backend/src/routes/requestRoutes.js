import express from 'express';
import { protect } from '../middlewares/authentication.js';

import { createRequest, updateRequestStatus, getUserRequests } from '../controllers/requestController.js';

const router = express.Router();

router.use(protect); // All request routes are protected

router.route("/").post(createRequest);
router.route("/:requestId").patch(updateRequestStatus)
router.route("/").get(getUserRequests);

export default router;
