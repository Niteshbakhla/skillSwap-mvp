import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import CustomError from '../utils/customError.js';
import config from '../config/config.js';


/**
 * Set JWT token in HttpOnly cookie
 * @param {Object} res - Express response object
 * @param {Object} user - User object (must have _id)
 */
export const sendTokenCookie = (res, user) => {
            const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
                        expiresIn: '7d'
            });

            // Cookie options
            const cookieOptions = {
                        httpOnly: true,           // Cannot be accessed via JS
                        secure: config.COOKIE_SECURE, // HTTPS only in prod
                        sameSite: 'Strict',       // Prevent CSRF
                        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            };

            res.cookie('token', token, cookieOptions);
            return token;
};

/**
 * Middleware to protect routes and attach user to req
 */
export const protect = asyncHandler(async (req, res, next) => {
            let token;

            // Check if token exists in cookies
            if (req.cookies && req.cookies.token) {
                        token = req.cookies.token;
            }

            if (!token) {
                        throw new CustomError('Not authorized, token missing', 401);
            }

            try {
                        const decoded = jwt.verify(token, config.JWT_SECRET);
                        req.user = { id: decoded.id };
                        next();
            } catch (err) {
                        throw new CustomError('Not authorized, token invalid', 401);
            }
});
