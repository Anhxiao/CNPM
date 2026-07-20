import api from "./api";

const BASE_URL = "/tasks";

const calendarService = {
    // Lấy toàn bộ công việc hiển thị trên lịch
    async getCalendarTasks(params = {}) {
        try {
            const response = await api.get(`${BASE_URL}/calendar`, {
                params,
            });

            return response.data;
        } catch (error) {
            console.error("Get calendar tasks error:", error);
            throw error;
        }
    },

    // Lấy các công việc trong khoảng thời gian
    async getTasksByDateRange(startDate, endDate) {
        try {
            const response = await api.get(`${BASE_URL}/date-range`, {
                params: {
                    startDate,
                    endDate,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Get tasks by date range error:", error);
            throw error;
        }
    },

    // Công việc hôm nay
    async getTodayTasks() {
        try {
            const response = await api.get(`${BASE_URL}/today`);
            return response.data;
        } catch (error) {
            console.error("Get today tasks error:", error);
            throw error;
        }
    },

    // Công việc sắp đến hạn
    async getUpcomingTasks() {
        try {
            const response = await api.get(`${BASE_URL}/upcoming`);
            return response.data;
        } catch (error) {
            console.error("Get upcoming tasks error:", error);
            throw error;
        }
    },

    // Công việc quá hạn
    async getOverdueTasks() {
        try {
            const response = await api.get(`${BASE_URL}/overdue`);
            return response.data;
        } catch (error) {
            console.error("Get overdue tasks error:", error);
            throw error;
        }
    },

    // Công việc theo ngày
    async getTasksByDate(date) {
        try {
            const response = await api.get(`${BASE_URL}/date/${date}`);
            return response.data;
        } catch (error) {
            console.error("Get tasks by date error:", error);
            throw error;
        }
    },

    // Công việc theo tháng
    async getTasksByMonth(month, year) {
        try {
            const response = await api.get(`${BASE_URL}/month`, {
                params: {
                    month,
                    year,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Get tasks by month error:", error);
            throw error;
        }
    },
};

export default calendarService;