import redis from "redis";
const redisPort = process.env.REDIS_PORT || 6379;

const esRedisGlobalKey = "ES_Global";

const url = `redis://Cognilium:Pta!23456@redis-10167.c265.us-east-1-2.ec2.cloud.redislabs.com:10167`;

const client = redis.createClient({
  url,
});

// redisClient.connect();

const esRedisExpireTime = 3600;

export default client;
export { esRedisGlobalKey, esRedisExpireTime };
