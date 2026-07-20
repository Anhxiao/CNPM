import Task from "../models/Task.js";

class TaskRepository {

    async create(taskData) {
        return await Task.create(taskData);
    }

    async findAll(filters = {}) {

        const {
            projectId,
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

        if (projectId)
            query.project = projectId;

        if (status)
            query.status = status;

        if (priority)
            query.priority = priority;

        if (assignee)
            query.assignee = assignee;

        if (keyword) {
            query.title = {
                $regex: keyword,
                $options: "i"
            };
        }

        const sort = {};

        sort[sortBy] = order === "asc" ? 1 : -1;

        const total = await Task.countDocuments(query);

        const tasks = await Task.find(query)

            .populate("creator", "fullName email")

            .populate("assignee", "fullName email")

            .sort(sort)

            .skip((page - 1) * limit)

            .limit(Number(limit));

        return {

            total,

            page,

            limit,

            totalPages: Math.ceil(total / limit),

            tasks

        };

    }

    async findById(id) {

        return await Task.findById(id)

            .populate("creator", "fullName email avatar")

            .populate("assignee", "fullName email avatar")

            .populate("project", "name");

    }

    async update(id, data) {

        return await Task.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return await Task.findByIdAndUpdate(

            id,

            {

                isDeleted: true

            },

            {

                new: true

            }

        );

    }

    async restore(id) {

        return await Task.findByIdAndUpdate(

            id,

            {

                isDeleted: false

            },

            {

                new: true

            }

        );

    }

}

export default new TaskRepository();