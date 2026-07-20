import StatisticsRepository from "../repositories/StatisticsRepository.js";

class StatisticsService {

    async getDashboard(userId) {

        return await StatisticsRepository.getDashboard(userId);

    }

}

export default new StatisticsService();