import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        title: {

            type: String,

            required: true,

            trim: true

        },

        message: {

            type: String,

            required: true

        },

        type: {

            type: String,

            enum: [

                "Task",

                "Project",

                "Reminder",

                "System"

            ],

            default: "Task"

        },

        isRead: {

            type: Boolean,

            default: false

        },

        referenceId: {

            type: mongoose.Schema.Types.ObjectId

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model(

    "Notification",

    notificationSchema

);