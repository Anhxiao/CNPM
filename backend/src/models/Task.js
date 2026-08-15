import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Tên công việc là bắt buộc."],
            trim: true,
            maxlength: 200
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: [true, "Công việc phải thuộc một dự án."],
            index: true
        },

        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        status: {
            type: String,
            enum: [
                "Todo",
                "In Progress",
                "Review",
                "Completed",
                "Cancelled"
            ],
            default: "Todo"
        },

        priority: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High",
                "Urgent"
            ],
            default: "Medium"
        },

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        startDate: {
            type: Date,
            default: null
        },

        dueDate: {
            type: Date,
            default: null
        },

        completedAt: {
            type: Date,
            default: null
        },

        tags: [
            {
                type: String,
                trim: true
            }
        ],

        attachments: [
            {
                type: String,
                trim: true
            }
        ],

        isDeleted: {
            type: Boolean,
            default: false,
            index: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

taskSchema.index({
    project: 1,
    isDeleted: 1
});

taskSchema.index({
    creator: 1,
    isDeleted: 1
});

taskSchema.index({
    dueDate: 1,
    isDeleted: 1
});

export default mongoose.model("Task", taskSchema);