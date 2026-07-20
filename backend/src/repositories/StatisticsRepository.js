import Project from "../models/Project.js";
import Task from "../models/Task.js";

class StatisticsRepository {

    async getDashboard(userId) {

        const totalProjects = await Project.countDocuments({

            owner: userId,

            isDeleted: false

        });

        const totalTasks = await Task.countDocuments({

            creator: userId,

            isDeleted: false

        });

        const completedTasks = await Task.countDocuments({

            creator: userId,

            status: "Completed",

            isDeleted: false

        });

        const todoTasks = await Task.countDocuments({

            creator: userId,

            status: "Todo",

            isDeleted: false

        });

        const inProgressTasks = await Task.countDocuments({

            creator: userId,

            status: "In Progress",

            isDeleted: false

        });

        const reviewTasks = await Task.countDocuments({

            creator: userId,

            status: "Review",

            isDeleted: false

        });

        const cancelledTasks = await Task.countDocuments({

            creator: userId,

            status: "Cancelled",

            isDeleted: false

        });

        const overdueTasks = await Task.countDocuments({

            creator: userId,

            status: {

                $ne: "Completed"

            },

            dueDate: {

                $lt: new Date()

            },

            isDeleted: false

        });

        return {

            totalProjects,

            totalTasks,

            completedTasks,

            todoTasks,

            inProgressTasks,

            reviewTasks,

            cancelledTasks,

            overdueTasks

        };

    }

}

export default new StatisticsRepository();