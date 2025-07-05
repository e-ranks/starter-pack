import mongoose from "mongoose"
import { IUser } from "@/interfaces/models/IUser"

const userSchema = new mongoose.Schema<IUser>(
    {
        image: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        allowedPaths: { type: [String], default: [] },
        role: { type: String, },
    },
    {
        timestamps: true
    }
)

export default mongoose.models.User || mongoose.model('User', userSchema)