import Message from '../models/Message.js';
import Request from '../models/Request.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import CustomError from '../utils/CustomError.js';

// Send a message in a match
export const sendMessage = asyncHandler(async (req, res) => {
            const { matchId, text } = req.body;

            const match = await Request.findById(matchId);
            if (!match) throw new CustomError('Match not found', 404);
            if (![match.fromUser.toString(), match.toUser.toString()].includes(req.user.id)) {
                        throw new CustomError('Not authorized to send message', 403);
            }

            const message = await Message.create({
                        matchId,
                        sender: req.user.id,
                        receiver: match.fromUser.toString() === req.user.id ? match.toUser : match.fromUser,
                        text
            });

            res.status(201).json({ message });
});

// Get all messages for a match
export const getMessages = asyncHandler(async (req, res) => {
            const { matchId } = req.params;

            const match = await Request.findById(matchId);
            if (!match) throw new CustomError('Match not found', 404);
            if (![match.fromUser.toString(), match.toUser.toString()].includes(req.user.id)) {
                        throw new CustomError('Not authorized', 403);
            }

            const messages = await Message.find({ matchId }).sort({ createdAt: 1 });

            res.status(200).json({ messages });
});
