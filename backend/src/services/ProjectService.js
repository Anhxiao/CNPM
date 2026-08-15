import ProjectRepository from "../repositories/ProjectRepository.js";

class ProjectService {

    async createProject(userId, projectData) {

        const project = {
            ...projectData,
            owner: userId,
            progress: 0
        };

        return await ProjectRepository.create(project);
    }

    async getProjects(userId) {

        return await ProjectRepository.findAll(userId);
    }

    async getProjectById(projectId, userId) {

        const project = await ProjectRepository.findById(projectId);

        if (!project) {
            throw new Error("Không tìm thấy dự án.");
        }

        if (
            !project.owner ||
            project.owner.toString() !== userId.toString()
        ) {
            throw new Error(
                "Bạn không có quyền truy cập dự án này."
            );
        }

        return project;
    }

    async updateProject(projectId, userId, data) {

        await this.getProjectById(
            projectId,
            userId
        );

        delete data.owner;
        delete data.progress;

        return await ProjectRepository.update(
            projectId,
            data
        );
    }

    async deleteProject(projectId, userId) {

        const project = await this.getProjectById(
            projectId,
            userId
        );

        if (project.isDeleted) {
            throw new Error("Dự án đã được xóa.");
        }

        return await ProjectRepository.delete(
            projectId
        );
    }

    async restoreProject(projectId, userId) {

        const project = await ProjectRepository.findById(
            projectId
        );

        if (!project) {
            throw new Error(
                "Không tìm thấy dự án."
            );
        }

        if (
            !project.owner ||
            project.owner.toString() !== userId.toString()
        ) {
            throw new Error(
                "Bạn không có quyền khôi phục dự án này."
            );
        }

        if (!project.isDeleted) {
            throw new Error(
                "Dự án chưa bị xóa."
            );
        }

        return await ProjectRepository.restore(
            projectId
        );
    }
}

export default new ProjectService();