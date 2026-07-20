import CalendarService from "../services/CalendarService.js";

import {

successResponse,

errorResponse

} from "../utils/response.js";

class CalendarController{

    async getCalendar(req,res){

        try{

            const month=req.query.month;

            const year=req.query.year;

            const result=await CalendarService.getCalendar(

                req.user.id,

                month,

                year

            );

            return successResponse(

                res,

                "Lấy dữ liệu lịch thành công.",

                result

            );

        }

        catch(error){

            return errorResponse(

                res,

                error.message,

                500

            );

        }

    }

}

export default new CalendarController();