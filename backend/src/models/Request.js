import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
            fromUser: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
            },
            toUser: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
            },
            skillOffered: {
                        type: String,
                        required: true
            },
            skillWanted: {
                        type: String,
                        required: true
            },
            status: {
                        type: String,
                        enum: ['pending', 'accepted', 'declined'],
                        default: 'pending'
            }
}, { timestamps: true });

requestSchema.index({ fromUser: 1, toUser: 1 });

const Request = mongoose.model('Request', requestSchema);
export default Request;
