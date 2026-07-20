import app from "./app.js";

import { connectDatabase } from "./config/database.js";
import { verifyMail } from "./config/mail.js";
import { env } from "./config/env.js";

import { startReminderJob } from "./jobs/reminder.job.js";
import { startNotificationJob } from "./jobs/notification.job.js";
import { startOverdueJob } from "./jobs/overdue.job.js";
import { startBackupJob } from "./jobs/backup.job.js";

const PORT = env.port || 5000;

let server;

const startServer = async () => {

    try {

        console.log("====================================");
        console.log(" Starting Project Management API...");
        console.log("====================================");

        await connectDatabase();

        await verifyMail();

        if (env.nodeEnv !== "test") {

            startReminderJob();

            startNotificationJob();

            startOverdueJob();

            startBackupJob();

        }

        server = app.listen(PORT, () => {

            console.log("====================================");
            console.log(" Server Started Successfully");
            console.log(` Environment : ${env.nodeEnv}`);
            console.log(` Port        : ${PORT}`);
            console.log(` API         : http://localhost:${PORT}/api`);
            console.log(` Swagger     : http://localhost:${PORT}/api-docs`);
            console.log("====================================");

        });

    } catch (error) {

        console.error("====================================");
        console.error(" Server Startup Failed");
        console.error(error);
        console.error("====================================");

        process.exit(1);

    }

};

startServer();

process.on("unhandledRejection", (error) => {

    console.error("====================================");
    console.error(" Unhandled Promise Rejection");
    console.error(error);
    console.error("====================================");

    if (server) {

        server.close(() => {

            process.exit(1);

        });

    }

});

process.on("uncaughtException", (error) => {

    console.error("====================================");
    console.error(" Uncaught Exception");
    console.error(error);
    console.error("====================================");

    process.exit(1);

});

const shutdown = () => {

    console.log("\nStopping Server...");

    if (server) {

        server.close(() => {

            console.log("Server stopped.");

            process.exit(0);

        });

    } else {

        process.exit(0);

    }

};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);