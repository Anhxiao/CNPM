import StatisticsService from "../services/StatisticsService.js";

import {

    successResponse,

    errorResponse

} from "../utils/response.js";

class StatisticsController {

    async getDashboard(req, res) {

        try {

            const result = await StatisticsService.getDashboard(

                req.user.id

            );

            return successResponse(

                res,

                "Lấy thống kê thành công.",

                result

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                500

            );

        }

    }

}

export default new StatisticsController();