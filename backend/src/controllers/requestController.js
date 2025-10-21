import Request from '../models/Request.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import CustomError from '../utils/CustomError.js';

// Create a new skill swap request
export const createRequest = asyncHandler(async (req, res) => {
            const { toUserId, skillOffered, skillWanted } = req.body;

            if (toUserId === req.user.id) throw new CustomError('Cannot send request to yourself', 400);

            const existing = await Request.findOne({ fromUser: req.user.id, toUser: toUserId, status: 'pending' });
            if (existing) throw new CustomError('You already sent a pending request to this user', 400);

            const request = await Request.create({
                        fromUser: req.user.id,
                        toUser: toUserId,
                        skillOffered,
                        skillWanted
            });

            res.status(201).json({ request });
});

// Accept or Decline a request
export const updateRequestStatus = asyncHandler(async (req, res) => {
            const { requestId } = req.params;
            const { status } = req.body; // accepted | declined

            const request = await Request.findById(requestId);
            if (!request) throw new CustomError('Request not found', 404);
            if (request.toUser.toString() !== req.user.id) throw new CustomError('Not authorized', 403);

            if (!['accepted', 'declined'].includes(status)) throw new CustomError('Invalid status', 400);

            request.status = status;
            await request.save();

            res.status(200).json({ request });
});

// Get all requests for logged-in user
export const getUserRequests = asyncHandler(async (req, res) => {
            const received = await Request.find({ toUser: req.user.id }).populate('fromUser', 'name skillsOffer skillsWant');
            const sent = await Request.find({ fromUser: req.user.id }).populate('toUser', 'name skillsOffer skillsWant');

            res.status(200).json({ received, sent });
});
