import winston from "winston";

const logger = winston.createLogger({

    level: "info",

    format: winston.format.combine(

        winston.format.timestamp(),

        winston.format.printf(({ level, message, timestamp }) => {

            return `${timestamp} [${level.toUpperCase()}] ${message}`;

        })

    ),

    transports: [

        new winston.transports.Console(),

        new winston.transports.File({

            filename: "src/logs/access.log"

        })

    ]

});

const loggerMiddleware = (req, res, next) => {

    logger.info(`${req.method} ${req.originalUrl}`);

    next();

};

export default loggerMiddleware;