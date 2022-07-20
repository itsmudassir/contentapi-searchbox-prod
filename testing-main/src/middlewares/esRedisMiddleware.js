import client, { esRedisExpireTime, esRedisGlobalKey } from "../config/redisConfig.js"

const esRedisMiddleware = async (req, res, next) => {
    const data = await client.hget(esRedisGlobalKey, JSON.stringify(req.body));
    if (data) {
        res.status(200).json(JSON.parse(data));
        console.log("inside redis middleware");
    } else {
        next();
    }

};

export default esRedisMiddleware;