import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
            matchId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Request',
                        required: true
            },
            reviewer: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
            },
            reviewee: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
            },
            rating: {
                        type: Number,
                        min: 1,
                        max: 5,
                        required: true
            },
            comment: {
                        type: String,
                        trim: true
            }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
