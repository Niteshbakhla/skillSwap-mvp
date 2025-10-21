import mongoose from "mongoose"
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
            name: {
                        type: String,
                        required: true,
                        trim: true
            },
            email: {
                        type: String,
                        required: true,
                        unique: true,
                        lowercase: true
            },
            passwordHash: {
                        type: String,
                        required: true
            },
            skillsOffer: {
                        type: [String],
                        default: []
            },
            skillsWant: {
                        type: [String],
                        default: []
            },
            avatarUrl: {
                        type: String,
                        default: ''
            }
}, { timestamps: true });

userSchema.index({ skillsOffer: 1 });
userSchema.index({ skillsWant: 1 });




// Password comparison method
userSchema.methods.comparePassword = async function (password) {
            return await bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);
export default User;
