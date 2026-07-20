import cron from "node-cron";

let reminderJob = null;

export const startReminderJob = () => {

    if (reminderJob) {

        console.log("Reminder Job already running.");

        return;

    }

    reminderJob = cron.schedule(
        "0 8 * * *",
        async () => {

            try {

                console.log("Reminder Job Running...");

                /*
                    TODO

                    1. Lấy Task sắp đến hạn

                    2. Tạo Notification

                    3. Gửi Email

                */

            } catch (error) {

                console.error("Reminder Job Error:", error.message);

            }

        },
        {
            scheduled: true
        }
    );

};

export const stopReminderJob = () => {

    if (reminderJob) {

        reminderJob.stop();

        reminderJob = null;

        console.log("Reminder Job Stopped.");

    }

};