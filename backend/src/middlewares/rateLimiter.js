import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 200,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message: "Too many requests."

    }

});

export default rateLimiter;