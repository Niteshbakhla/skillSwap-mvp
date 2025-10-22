import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import config from '../config/config.js';
import { sendTokenCookie } from '../middlewares/authentication.js';

// Signup
export const signup = asyncHandler(async (req, res) => {
            const { name, email, password, skillsOffer, skillsWant } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) throw new CustomError('Email already in use', 400);

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = await User.create({
                        name,
                        email,
                        passwordHash,
                        skillsOffer,
                        skillsWant
            });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                        expiresIn: '7d'
            });

            res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, skillsOffer, skillsWant }, token });
});

// Login
export const login = asyncHandler(async (req, res) => {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) throw new CustomError('Invalid email or password', 401);

            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) throw new CustomError('Invalid email or password', 401);

            const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
                        expiresIn: '7d'
            });

            sendTokenCookie(res, user);

            res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, skillsOffer: user.skillsOffer, skillsWant: user.skillsWant }, token });
});

// Get logged-in user profile
export const getProfile = asyncHandler(async (req, res) => {
            const user = await User.findById(req.user.id).select('-passwordHash');
            if (!user) throw new CustomError('User not found', 404);

            res.status(200).json({ user });
});


export const findMatches = asyncHandler(async (req, res) => {
            const user = await User.findById(req.user.id);
            const matches = await User.find({
                        skillsOffer: { $in: user.skillsWant },
                        skillsWant: { $in: user.skillsOffer },
                        _id: { $ne: user._id }
            }).select('name skillsOffer skillsWant avatarUrl');

            res.status(200).json({ matches });
});