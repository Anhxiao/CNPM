import Project from "../models/Project.js";

class ProjectRepository {

    async create(projectData) {
        return await Project.create(projectData);
    }

    async findAll(userId) {
        return await Project.find({
            owner: userId,
            isDeleted: false
        }).sort({ createdAt: -1 });
    }

    async findById(projectId) {
        return await Project.findById(projectId);
    }

    async update(projectId, data) {
        return await Project.findByIdAndUpdate(
            projectId,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async delete(projectId) {
        return await Project.findByIdAndUpdate(
            projectId,
            {
                isDeleted: true
            },
            {
                new: true
            }
        );
    }

    async restore(projectId) {
        return await Project.findByIdAndUpdate(
            projectId,
            {
                isDeleted: false
            },
            {
                new: true
            }
        );
    }

}

export default new ProjectRepository();