import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(

    {

        title: {

            type: String,

            required: true,

            trim: true,

            maxlength: 200

        },

        description: {

            type: String,

            default: ""

        },

        project: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Project",

            required: true

        },

        creator: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        assignee: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User"

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

            type: Date

        },

        dueDate: {

            type: Date

        },

        completedAt: {

            type: Date

        },

        tags: [

            {

                type: String

            }

        ],

        attachments: [

            {

                type: String

            }

        ],

        isDeleted: {

            type: Boolean,

            default: false

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model(

    "Task",

    taskSchema

);