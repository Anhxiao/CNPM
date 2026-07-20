import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        action: {
            type: String,
            required: true,
            enum: [
                "LOGIN",
                "LOGOUT",
                "REGISTER",
                "CREATE",
                "UPDATE",
                "DELETE",
                "RESTORE",
                "COMPLETE",
                "ASSIGN",
                "UPLOAD"
            ]
        },

        module: {
            type: String,
            required: true,
            enum: [
                "USER",
                "PROJECT",
                "TASK",
                "COMMENT",
                "NOTIFICATION",
                "FILE",
                "SYSTEM"
            ]
        },

        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        ipAddress: {
            type: String,
            default: null
        },

        userAgent: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

activityLogSchema.index({
    user: 1,
    createdAt: -1
});

activityLogSchema.index({
    module: 1
});

activityLogSchema.index({
    action: 1
});

export default mongoose.model("ActivityLog", activityLogSchema);