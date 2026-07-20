import ProjectRepository from "../repositories/ProjectRepository.js";

class ProjectService {

    /**
     * Tạo Project
     */
    async createProject(userId, projectData) {

        const project = {

            ...projectData,

            owner: userId

        };

        return await ProjectRepository.create(project);

    }

    /**
     * Danh sách Project
     */
    async getProjects(userId) {

        return await ProjectRepository.findAll(userId);

    }

    /**
     * Chi tiết Project
     */
    async getProjectById(projectId, userId) {

        const project = await ProjectRepository.findById(projectId);

        if (!project) {

            throw new Error("Không tìm thấy dự án.");

        }

        if (project.owner.toString() !== userId) {

            throw new Error("Bạn không có quyền truy cập dự án này.");

        }

        return project;

    }

    /**
     * Cập nhật
     */
    async updateProject(projectId, userId, data) {

        await this.getProjectById(projectId, userId);

        return await ProjectRepository.update(projectId, data);

    }

    /**
     * Xóa mềm
     */
    async deleteProject(projectId, userId) {

        await this.getProjectById(projectId, userId);

        return await ProjectRepository.delete(projectId);

    }

    /**
     * Khôi phục
     */
    async restoreProject(projectId, userId) {

        await this.getProjectById(projectId, userId);

        return await ProjectRepository.restore(projectId);

    }

}

export default new ProjectService();