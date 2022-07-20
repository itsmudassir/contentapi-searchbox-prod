import {clearHash} from "../controllers/redisController.js"

export  function async (req, res, next) {
  await next();

  clearHash(req.user.id);
};