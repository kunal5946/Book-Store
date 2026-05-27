import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "../config/redis.js";

const apiLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

export default apiLimiter;