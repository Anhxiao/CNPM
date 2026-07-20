import api from "./api";

const statisticsService = {

    getDashboardStatistics() {

        return api.get(

            "/statistics/dashboard"

        );

    },

    getProjectStatistics() {

        return api.get(

            "/statistics/projects"

        );

    },

    getTaskStatistics() {

        return api.get(

            "/statistics/tasks"

        );

    }

};

export default statisticsService;