import CommentRepository from "../repositories/CommentRepository.js";

class CommentService{

    async createComment(userId,data){

        data.user=userId;

        return await CommentRepository.create(data);

    }

    async getComments(taskId){

        return await CommentRepository.findByTask(taskId);

    }

    async updateComment(id,data){

        return await CommentRepository.update(id,data);

    }

    async deleteComment(id){

        return await CommentRepository.delete(id);

    }

}

export default new CommentService();