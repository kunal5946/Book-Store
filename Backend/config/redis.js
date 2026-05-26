import {createClient} from "redis";

const redisClient=createClient({
    url:process.env.REDIS_URL || process.env.REDIS_URI || "redis://localhost:6379"
})

redisClient.on("error",(err)=>console.log("redis client error", err));

redisClient.connect().then(()=>{
    console.log("connected to redis");

}).catch((err)=>{
    console.error("failed to connect to redis: ",err);
});

export default redisClient;