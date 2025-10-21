import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
            matchId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Request',
                        required: true
            },
            sender: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
            },
            receiver: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
            },
            text: {
                        type: String,
                        required: true,
                        trim: true
            }
}, { timestamps: true });

messageSchema.index({ matchId: 1 });
const Message = mongoose.model('Message', messageSchema);
export default Message;
