import TaskService from "../services/TaskService.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

class TaskController {

    /**
     * Tạo Task
     */
    async createTask(req, res) {

        try {

            const task = await TaskService.createTask(

                req.user.id,

                req.body

            );

            return successResponse(

                res,

                "Tạo công việc thành công.",

                task,

                201

            );

        } catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

    /**
     * Danh sách Task
     */
    async getTasks(req, res) {

        try {

            const filters = {

                projectId: req.query.projectId,

                status: req.query.status,

                priority: req.query.priority,

                assignee: req.query.assignee,

                keyword: req.query.keyword,

                page: req.query.page,

                limit: req.query.limit,

                sortBy: req.query.sortBy,

                order: req.query.order

            };

            const tasks = await TaskService.getTasks(filters);

            return successResponse(

                res,

                "Lấy danh sách công việc thành công.",

                tasks

            );

        } catch (error) {

            return errorResponse(

                res,

                error.message,

                500

            );

        }

    }

    /**
     * Chi tiết Task
     */
    async getTaskById(req, res) {

        try {

            const task = await TaskService.getTaskById(

                req.params.id

            );

            return successResponse(

                res,

                "Lấy thông tin công việc thành công.",

                task

            );

        } catch (error) {

            return errorResponse(

                res,

                error.message,

                404

            );

        }

    }

    /**
     * Cập nhật Task
     */
    async updateTask(req, res) {

        try {

            const task = await TaskService.updateTask(

                req.params.id,

                req.user.id,

                req.body

            );

            return successResponse(

                res,

                "Cập nhật công việc thành công.",

                task

            );

        } catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

    /**
     * Xóa Task
     */
    async deleteTask(req, res) {

        try {

            await TaskService.deleteTask(

                req.params.id,

                req.user.id

            );

            return successResponse(

                res,

                "Xóa công việc thành công."

            );

        } catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

    /**
     * Khôi phục Task
     */
    async restoreTask(req, res) {

        try {

            const task = await TaskService.restoreTask(

                req.params.id,

                req.user.id

            );

            return successResponse(

                res,

                "Khôi phục công việc thành công.",

                task

            );

        } catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

}

export default new TaskController();