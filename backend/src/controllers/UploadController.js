import UploadService from "../services/UploadService.js";

import {

successResponse,

errorResponse

} from "../utils/response.js";

class UploadController {

    async uploadAvatar(req, res) {

        try {

            const result = await UploadService.uploadAvatar(

                req.file

            );

            return successResponse(

                res,

                "Upload ảnh đại diện thành công.",

                result

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

    async uploadAttachment(req, res) {

        try {

            const result = await UploadService.uploadAttachment(

                req.file

            );

            return successResponse(

                res,

                "Upload tệp thành công.",

                result

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

}

export default new UploadController();