import TaskRepository from "../repositories/TaskRepository.js";
import ProjectRepository from "../repositories/ProjectRepository.js";

class TaskService {

    async checkProject(projectId, userId) {

        const project = await ProjectRepository.findById(
            projectId
        );

        if (!project) {
            throw new Error(
                "Dự án không tồn tại."
            );
        }

        if (project.isDeleted) {
            throw new Error(
                "Dự án đã bị xóa."
            );
        }

        if (
            !project.owner ||
            project.owner.toString() !== userId.toString()
        ) {
            throw new Error(
                "Bạn không có quyền thao tác với dự án này."
            );
        }

        return project;
    }

    calculateProgress(status) {

        switch (status) {

            case "Todo":
                return 0;

            case "In Progress":
                return 50;

            case "Review":
                return 80;

            case "Completed":
                return 100;

            case "Cancelled":
                return 0;

            default:
                return 0;
        }
    }

    async createTask(userId, taskData) {

        if (!taskData.project) {
            throw new Error(
                "Công việc phải thuộc một dự án."
            );
        }

        await this.checkProject(
            taskData.project,
            userId
        );

        const task = {
            ...taskData,
            creator: userId
        };

        task.progress = this.calculateProgress(
            task.status || "Todo"
        );

        if (task.status === "Completed") {
            task.completedAt = new Date();
        } else {
            task.completedAt = null;
        }

        const createdTask =
            await TaskRepository.create(task);

        await this.updateProjectProgress(
            task.project
        );

        return createdTask;
    }

    async getTasks(userId, filters = {}) {

        const result = await TaskRepository.findAll(
            filters
        );

        const tasks = result?.tasks || result || [];

        const userTasks = [];

        for (const task of tasks) {

            if (!task.project) {
                continue;
            }

            const projectId =
                task.project._id || task.project;

            try {

                await this.checkProject(
                    projectId,
                    userId
                );

                userTasks.push(task);

            } catch (error) {

                continue;
            }
        }

        if (result?.tasks) {

            return {
                ...result,
                tasks: userTasks,
                total: userTasks.length
            };

        }

        return userTasks;
    }

    async getTaskById(taskId, userId) {

        const task =
            await TaskRepository.findById(taskId);

        if (!task) {
            throw new Error(
                "Không tìm thấy công việc."
            );
        }

        if (task.isDeleted) {
            throw new Error(
                "Công việc đã bị xóa."
            );
        }

        const projectId =
            task.project?._id || task.project;

        await this.checkProject(
            projectId,
            userId
        );

        return task;
    }

    async updateTask(taskId, userId, data) {

        const task =
            await TaskRepository.findById(taskId);

        if (!task) {
            throw new Error(
                "Không tìm thấy công việc."
            );
        }

        const projectId =
            task.project?._id || task.project;

        await this.checkProject(
            projectId,
            userId
        );

        delete data.creator;
        delete data.project;

        if (data.status) {

            data.progress =
                this.calculateProgress(
                    data.status
                );

            if (
                data.status === "Completed"
            ) {

                data.completedAt =
                    new Date();

            } else {

                data.completedAt = null;
            }
        }

        const updatedTask =
            await TaskRepository.update(
                taskId,
                data
            );

        await this.updateProjectProgress(
            projectId
        );

        return updatedTask;
    }

    async deleteTask(taskId, userId) {

        const task =
            await TaskRepository.findById(taskId);

        if (!task) {
            throw new Error(
                "Không tìm thấy công việc."
            );
        }

        const projectId =
            task.project?._id || task.project;

        await this.checkProject(
            projectId,
            userId
        );

        const deletedTask =
            await TaskRepository.delete(
                taskId
            );

        await this.updateProjectProgress(
            projectId
        );

        return deletedTask;
    }

    async restoreTask(taskId, userId) {

        const task =
            await TaskRepository.findById(taskId);

        if (!task) {
            throw new Error(
                "Không tìm thấy công việc."
            );
        }

        const projectId =
            task.project?._id || task.project;

        await this.checkProject(
            projectId,
            userId
        );

        const restoredTask =
            await TaskRepository.restore(
                taskId
            );

        await this.updateProjectProgress(
            projectId
        );

        return restoredTask;
    }

    async updateProjectProgress(projectId) {

        const result =
            await TaskRepository.findAll({
                projectId
            });

        const tasks =
            result?.tasks || result || [];

        if (
            !tasks ||
            tasks.length === 0
        ) {

            await ProjectRepository.update(
                projectId,
                {
                    progress: 0
                }
            );

            return 0;
        }

        const activeTasks =
            tasks.filter(
                task => !task.isDeleted
            );

        if (
            activeTasks.length === 0
        ) {

            await ProjectRepository.update(
                projectId,
                {
                    progress: 0
                }
            );

            return 0;
        }

        const completedTasks =
            activeTasks.filter(
                task =>
                    task.status === "Completed"
            ).length;

        const progress =
            Math.round(
                (
                    completedTasks /
                    activeTasks.length
                ) * 100
            );

        await ProjectRepository.update(
            projectId,
            {
                progress
            }
        );

        return progress;
    }
}

export default new TaskService();