import cron from "node-cron";

let overdueJob = null;

export const startOverdueJob = () => {

    if (overdueJob) {

        console.log("Overdue Job already running.");

        return;

    }

    overdueJob = cron.schedule(
        "0 0 * * *",
        async () => {

            try {

                console.log("Checking overdue tasks...");

                /*
                    TODO

                    1. Kiểm tra Task quá hạn

                    2. Cập nhật trạng thái

                    3. Tạo Notification

                */

            } catch (error) {

                console.error("Overdue Job Error:", error.message);

            }

        },
        {
            scheduled: true
        }
    );

};

export const stopOverdueJob = () => {

    if (overdueJob) {

        overdueJob.stop();

        overdueJob = null;

        console.log("Overdue Job Stopped.");

    }

};