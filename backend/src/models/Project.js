import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Tên dự án là bắt buộc."],
            trim: true,
            maxlength: 100
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        status: {
            type: String,
            enum: [
                "Planning",
                "In Progress",
                "Completed"
            ],
            default: "Planning"
        },

        startDate: {
            type: Date,
            default: null
        },

        endDate: {
            type: Date,
            default: null
        },

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        color: {
            type: String,
            default: "#0d6efd",
            trim: true
        },

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

projectSchema.index({
    owner: 1,
    isDeleted: 1
});

const Project = mongoose.model(
    "Project",
    projectSchema
);

export default Project;