import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

},{
    timestamps:true
});

export default mongoose.model(
    "Comment",
    commentSchema
);