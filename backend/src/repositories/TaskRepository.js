import Task from "../models/Task.js";

class TaskRepository {

    async create(taskData) {
        return await Task.create(taskData);
    }

    async findAll(filters = {}) {

        const {
            projectId,
            projectIds,
            status,
            priority,
            assignee,
            keyword,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            order = "desc"
        } = filters;

        const query = {
            isDeleted: false
        };

        if (projectId) {
            query.project = projectId;
        }

        if (
            Array.isArray(projectIds) &&
            projectIds.length > 0
        ) {
            query.project = {
                $in: projectIds
            };
        }

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        if (assignee) {
            query.assignee = assignee;
        }

        if (keyword) {
            query.$or = [
                {
                    title: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: keyword,
                        $options: "i"
                    }
                }
            ];
        }

        const currentPage = Math.max(
            Number(page) || 1,
            1
        );

        const currentLimit = Math.min(
            Math.max(Number(limit) || 10, 1),
            100
        );

        const skip =
            (currentPage - 1) * currentLimit;

        const allowedSortFields = [
            "createdAt",
            "updatedAt",
            "title",
            "priority",
            "status",
            "dueDate",
            "startDate"
        ];

        const validSortBy =
            allowedSortFields.includes(sortBy)
                ? sortBy
                : "createdAt";

        const sort = {
            [validSortBy]:
                order === "asc" ? 1 : -1
        };

        const total =
            await Task.countDocuments(query);

        const tasks =
            await Task.find(query)
                .populate(
                    "creator",
                    "fullName email avatar"
                )
                .populate(
                    "assignee",
                    "fullName email avatar"
                )
                .populate(
                    "project",
                    "name description status startDate endDate progress color owner"
                )
                .sort(sort)
                .skip(skip)
                .limit(currentLimit)
                .lean();

        return {
            total,
            page: currentPage,
            limit: currentLimit,
            totalPages: Math.ceil(
                total / currentLimit
            ),
            tasks
        };
    }

    async findById(id) {

        return await Task.findOne({
            _id: id,
            isDeleted: false
        })
            .populate(
                "creator",
                "fullName email avatar"
            )
            .populate(
                "assignee",
                "fullName email avatar"
            )
            .populate(
                "project",
                "name description status startDate endDate progress color owner"
            );
    }

    async findByIdIncludingDeleted(id) {

        return await Task.findById(id)
            .populate(
                "creator",
                "fullName email avatar"
            )
            .populate(
                "assignee",
                "fullName email avatar"
            )
            .populate(
                "project",
                "name description status startDate endDate progress color owner"
            );
    }

    async update(id, data) {

        return await Task.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false
            },
            data,
            {
                new: true,
                runValidators: true
            }
        )
            .populate(
                "creator",
                "fullName email avatar"
            )
            .populate(
                "assignee",
                "fullName email avatar"
            )
            .populate(
                "project",
                "name description status startDate endDate progress color owner"
            );
    }

    async delete(id) {

        return await Task.findOneAndUpdate(
            {
                _id: id,
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

    async restore(id) {

        return await Task.findOneAndUpdate(
            {
                _id: id,
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

    async countByProject(projectId) {

        return await Task.countDocuments({
            project: projectId,
            isDeleted: false
        });
    }

    async countCompletedByProject(projectId) {

        return await Task.countDocuments({
            project: projectId,
            status: "Completed",
            isDeleted: false
        });
    }

    async findByProject(projectId) {

        return await Task.find({
            project: projectId,
            isDeleted: false
        })
            .populate(
                "creator",
                "fullName email avatar"
            )
            .populate(
                "assignee",
                "fullName email avatar"
            )
            .populate(
                "project",
                "name description status startDate endDate progress color owner"
            )
            .sort({
                createdAt: -1
            });
    }
}

export default new TaskRepository();