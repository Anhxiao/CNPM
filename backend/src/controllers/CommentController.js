import CommentService from "../services/CommentService.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

class CommentController{

    async createComment(req,res){

        try{

            const result=await CommentService.createComment(

                req.user.id,

                req.body

            );

            return successResponse(

                res,

                "Thêm bình luận thành công.",

                result,

                201

            );

        }catch(error){

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

    async getComments(req,res){

        try{

            const result=await CommentService.getComments(

                req.params.taskId

            );

            return successResponse(

                res,

                "Lấy bình luận thành công.",

                result

            );

        }catch(error){

            return errorResponse(

                res,

                error.message,

                500

            );

        }

    }

}

export default new CommentController();