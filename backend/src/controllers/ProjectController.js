import projectService from "../services/ProjectService.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

class ProjectController {

    async createProject(req, res) {

        try {

            const project = await projectService.createProject(
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

            console.error("Create Project Error:", error);

            return errorResponse(
                res,
                error.message || "Không thể tạo dự án.",
                error.statusCode || 500
            );

        }

    }

    async getProjects(req, res) {

        try {

            const projects = await projectService.getProjects(
                req.user.id
            );

            return successResponse(
                res,
                "Lấy danh sách dự án thành công.",
                projects
            );

        } catch (error) {

            console.error("Get Projects Error:", error);

            return errorResponse(
                res,
                error.message || "Không thể lấy danh sách dự án.",
                error.statusCode || 500
            );

        }

    }

    async getProjectById(req, res) {

        try {

            const project = await projectService.getProjectById(
                req.params.id,
                req.user.id
            );

            return successResponse(
                res,
                "Lấy thông tin dự án thành công.",
                project
            );

        } catch (error) {

            console.error("Get Project By Id Error:", error);

            return errorResponse(
                res,
                error.message || "Không tìm thấy dự án.",
                error.statusCode || 500
            );

        }

    }

    async updateProject(req, res) {

        try {

            const project = await projectService.updateProject(
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

            console.error("Update Project Error:", error);

            return errorResponse(
                res,
                error.message || "Không thể cập nhật dự án.",
                error.statusCode || 500
            );

        }

    }

    async deleteProject(req, res) {

        try {

            await projectService.deleteProject(
                req.params.id,
                req.user.id
            );

            return successResponse(
                res,
                "Xóa dự án thành công."
            );

        } catch (error) {

            console.error("Delete Project Error:", error);

            return errorResponse(
                res,
                error.message || "Không thể xóa dự án.",
                error.statusCode || 500
            );

        }

    }

    async restoreProject(req, res) {

        try {

            const project = await projectService.restoreProject(
                req.params.id,
                req.user.id
            );

            return successResponse(
                res,
                "Khôi phục dự án thành công.",
                project
            );

        } catch (error) {

            console.error("Restore Project Error:", error);

            return errorResponse(
                res,
                error.message || "Không thể khôi phục dự án.",
                error.statusCode || 500
            );

        }

    }

}

export default new ProjectController();