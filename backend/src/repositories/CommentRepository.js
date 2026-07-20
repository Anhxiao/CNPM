import Comment from "../models/Comment.js";

class CommentRepository {

    async create(data){

        return await Comment.create(data);

    }

    async findByTask(taskId){

        return await Comment.find({

            task:taskId,

            isDeleted:false

        })

        .populate("user","fullName email avatar")

        .sort({

            createdAt:1

        });

    }

    async findById(id){

        return await Comment.findById(id);

    }

    async update(id,data){

        return await Comment.findByIdAndUpdate(

            id,

            data,

            {

                new:true

            }

        );

    }

    async delete(id){

        return await Comment.findByIdAndUpdate(

            id,

            {

                isDeleted:true

            },

            {

                new:true

            }

        );

    }

}

export default new CommentRepository();