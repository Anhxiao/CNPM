import express from "express";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import routes from "./routes/index.js";

import corsMiddleware from "./middlewares/corsMiddleware.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.disable("x-powered-by");

if (process.env.NODE_ENV !== "test") {

    await import("./jobs/reminder.job.js");
    await import("./jobs/notification.job.js");
    await import("./jobs/overdue.job.js");
    await import("./jobs/backup.job.js");

}

// HTTP Security Headers
app.use(helmet());

// Response Compression
app.use(compression());

// Cross Origin Resource Sharing
app.use(corsMiddleware);

// Rate Limiter
app.use(rateLimiter);

// Parse JSON Request
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// HTTP Logger
app.use(morgan("dev"));

// Custom Logger
app.use(loggerMiddleware);

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customSiteTitle: "Project Management API",
        swaggerOptions: {
            persistAuthorization: true
        }
    })
);

app.get("/", (req, res) => {

    return res.status(200).json({

        success: true,

        application: "Project Management System",

        version: "1.0.0",

        environment: process.env.NODE_ENV || "development",

        status: "Running",

        serverTime: new Date().toISOString(),

        api: "/api",

        swagger: "/api-docs"

    });

});

app.use("/api", routes);

app.use((req, res) => {

    return res.status(404).json({

        success: false,

        statusCode: 404,

        message: "API Not Found",

        method: req.method,

        path: req.originalUrl,

        timestamp: new Date().toISOString()

    });

});

app.use(errorHandler);

export default app;