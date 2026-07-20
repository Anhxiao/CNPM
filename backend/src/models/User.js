import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

    {

        fullName: {

            type: String,

            required: true,

            trim: true,

            minlength: 3,

            maxlength: 100

        },

        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },

        password: {

            type: String,

            required: true,

            minlength: 6

        },

        phone: {

            type: String,

            default: ""

        },

        avatar: {

            type: String,

            default: ""

        },

        role: {

            type: String,

            enum: [

                "admin",

                "user"

            ],

            default: "user"

        },

        status: {

            type: Boolean,

            default: true

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model("User", userSchema);