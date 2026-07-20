import {

    avatarUpload,

    attachmentUpload

} from "../config/upload.js";

export const uploadAvatar = avatarUpload.single("avatar");

export const uploadAttachment = attachmentUpload.single("attachment");