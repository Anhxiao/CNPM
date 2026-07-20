import cron from "node-cron";

let backupJob = null;

export const startBackupJob = () => {

    if (backupJob) {

        console.log("Backup Job already running.");

        return;

    }

    backupJob = cron.schedule(
        "0 2 * * *",
        async () => {

            try {

                console.log("Database Backup Running...");

                /*
                    TODO

                    Backup MongoDB

                    Upload Backup

                */

            } catch (error) {

                console.error("Backup Job Error:", error.message);

            }

        },
        {
            scheduled: true
        }
    );

};

export const stopBackupJob = () => {

    if (backupJob) {

        backupJob.stop();

        backupJob = null;

        console.log("Backup Job Stopped.");

    }

};