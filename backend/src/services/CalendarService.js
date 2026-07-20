import Task from "../models/Task.js";

class CalendarService {

    async getCalendar(userId, month, year) {

        const start = new Date(year, month - 1, 1);

        const end = new Date(year, month, 0, 23, 59, 59);

        const tasks = await Task.find({

            assignee: userId,

            isDeleted: false,

            dueDate: {

                $gte: start,

                $lte: end

            }

        })

        .populate("project", "name")

        .sort({

            dueDate: 1

        });

        return tasks;

    }

}

export default new CalendarService();