import TaskRepository from "../repositories/TaskRepository.js";
import ProjectRepository from "../repositories/ProjectRepository.js";

class TaskService {

    /**
     * Kiểm tra Project có tồn tại
     * và User có quyền thao tác hay không
     */
    async checkProject(projectId, userId) {

        const project = await ProjectRepository.findById(projectId);

        if (!project) {
            throw new Error("Dự án không tồn tại.");
        }

        if (project.owner.toString() !== userId) {
            throw new Error("Bạn không có quyền thao tác dự án này.");
        }

        return project;
    }

    /**
     * Tính tiến độ Task theo Status
     */
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

    /**
     * Tạo Task
     */
    async createTask(userId, taskData) {

        await this.checkProject(
            taskData.project,
            userId
        );

        taskData.creator = userId;

        const task = await TaskRepository.create(taskData);

        await this.updateProjectProgress(taskData.project);

        return task;

    }

    /**
     * Danh sách Task
     */
    async getTasks(filters) {

        return await TaskRepository.findAll(filters);

    }

    /**
     * Chi tiết Task
     */
    async getTaskById(taskId) {

        const task = await TaskRepository.findById(taskId);

        if (!task) {
            throw new Error("Không tìm thấy công việc.");
        }

        return task;

    }

    /**
     * Cập nhật Task
     */
    async updateTask(taskId, userId, data) {

        const task = await this.getTaskById(taskId);

        await this.checkProject(
            task.project._id,
            userId
        );

        if (data.status) {

            data.progress = this.calculateProgress(
                data.status
            );

            if (data.status === "Completed") {

                data.completedAt = new Date();

            } else {

                data.completedAt = null;

            }

        }

        const updatedTask = await TaskRepository.update(
            taskId,
            data
        );

        await this.updateProjectProgress(
            task.project._id
        );

        return updatedTask;

    }

    /**
     * Xóa mềm Task
     */
    async deleteTask(taskId, userId) {

        const task = await this.getTaskById(taskId);

        await this.checkProject(
            task.project._id,
            userId
        );

        const deletedTask = await TaskRepository.delete(taskId);

        await this.updateProjectProgress(
            task.project._id
        );

        return deletedTask;

    }

    /**
     * Khôi phục Task
     */
    async restoreTask(taskId, userId) {

        const task = await this.getTaskById(taskId);

        await this.checkProject(
            task.project._id,
            userId
        );

        const restoredTask = await TaskRepository.restore(taskId);

        await this.updateProjectProgress(
            task.project._id
        );

        return restoredTask;

    }

    /**
     * Cập nhật Progress của Project
     */
    async updateProjectProgress(projectId) {

        const result = await TaskRepository.findAll({

            projectId

        });

        const tasks = result.tasks;

        if (!tasks || tasks.length === 0) {

            await ProjectRepository.update(projectId, {

                progress: 0

            });

            return;

        }

        const completedTasks = tasks.filter(

            task => task.status === "Completed"

        ).length;

        const progress = Math.round(

            (completedTasks / tasks.length) * 100

        );

        await ProjectRepository.update(projectId, {

            progress

        });

    }

}

export default new TaskService();