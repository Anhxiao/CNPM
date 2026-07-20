import ProjectService from "../services/ProjectService.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

class ProjectController {

    async createProject(req, res) {

        try {

            const project = await ProjectService.createProject(
                req.user.id,
                req.body
            );

            return successResponse(
                res,
                "Tạo dự án thành công.",
                project,
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

    async getProjects(req, res) {

        try {

            const projects = await ProjectService.getProjects(
                req.user.id
            );

            return successResponse(
                res,
                "Lấy danh sách dự án thành công.",
                projects
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                500
            );

        }

    }

    async getProjectById(req, res) {

        try {

            const project = await ProjectService.getProjectById(
                req.params.id,
                req.user.id
            );

            return successResponse(
                res,
                "Lấy thông tin dự án thành công.",
                project
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                404
            );

        }

    }

    async updateProject(req, res) {

        try {

            const project = await ProjectService.updateProject(
                req.params.id,
                req.user.id,
                req.body
            );

            return successResponse(
                res,
                "Cập nhật dự án thành công.",
                project
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                400
            );

        }

    }

    async deleteProject(req, res) {

        try {

            await ProjectService.deleteProject(
                req.params.id,
                req.user.id
            );

            return successResponse(
                res,
                "Xóa dự án thành công."
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                400
            );

        }

    }

    async restoreProject(req, res) {

        try {

            const project = await ProjectService.restoreProject(
                req.params.id,
                req.user.id
            );

            return successResponse(
                res,
                "Khôi phục dự án thành công.",
                project
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

export default new ProjectController();