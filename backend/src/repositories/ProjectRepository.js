import Project from "../models/Project.js";

class ProjectRepository {

    async create(projectData) {
        return await Project.create(projectData);
    }

    async findAll(userId) {
        return await Project.find({
            owner: userId,
            isDeleted: false
        })
            .sort({
                createdAt: -1
            })
            .lean();
    }

    async findById(projectId) {
        return await Project.findOne({
            _id: projectId,
            isDeleted: false
        }).populate(
            "owner",
            "fullName email avatar"
        );
    }

    async findByIdIncludingDeleted(projectId) {
        return await Project.findById(
            projectId
        ).populate(
            "owner",
            "fullName email avatar"
        );
    }

    async update(projectId, data) {
        return await Project.findOneAndUpdate(
            {
                _id: projectId,
                isDeleted: false
            },
            data,
            {
                new: true,
                runValidators: true
            }
        ).populate(
            "owner",
            "fullName email avatar"
        );
    }

    async delete(projectId) {
        return await Project.findOneAndUpdate(
            {
                _id: projectId,
                isDeleted: false
            },
            {
                isDeleted: true
            },
            {
                new: true
            }
        );
    }

    async restore(projectId) {
        return await Project.findOneAndUpdate(
            {
                _id: projectId,
                isDeleted: true
            },
            {
                isDeleted: false
            },
            {
                new: true
            }
        );
    }

    async countByOwner(userId) {
        return await Project.countDocuments({
            owner: userId,
            isDeleted: false
        });
    }

    async findDeleted(userId) {
        return await Project.find({
            owner: userId,
            isDeleted: true
        })
            .sort({
                updatedAt: -1
            })
            .lean();
    }
}

export default new ProjectRepository();