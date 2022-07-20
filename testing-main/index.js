import 'dotenv/config';
import express from "express";
import connectDatabase from "./src/config/databaseConnection.js";
import { checkConnection } from "./src/config/elasticSearchConnection.js";
import user from "./src/routes/api/userRoutes/user.Route.js";
import insights from "./src/routes/api/insights/insights.Route.js"
import favouritesFolder from "./src/routes/api/addToFavouriteRoutes/favouritesFolder.Route.js";
import favouritePosts from "./src/routes/api/addToFavouriteRoutes/favouritePost.Route.js";
import articleSearch from "./src/routes/api/articleSearchRoutes/articleSearch.Routes.js";
import customTopicSearch from "./src/routes/api/customTopicSearchRoutes/customTopicSearch.Route.js";
import followedTopics from "./src/routes/api/followedTopicsRoutes/followedTopics.Routes.js"
import errorHandler from "./src/middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { server } from "./src/GQL_SearchKit/gqlSearchkit.js";
import wakeupModel from "./src/models/wakeupModel/wakeup.model.js";
// cache
import { clearHash } from "./src/controllers/cachingControllers/redis.Controller.js";

const port = process.env.PORT || 7777;

const app = express();
app.set("trust proxy", 1);

app.use(cookieParser());


// app.use(
//   cors({
//     credentials: true,
//     origin: "https://content-api-react-client-prod.vercel.app"
//   })
// );

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// app.use(cors())


// server.applyMiddleware({ app });

// database connections
connectDatabase();
// checkConnection();



// api routes
app.use(express.json());
app.use("/api/user", user);
app.use("/api/favouritesFolder", favouritesFolder);
app.use("/api/favouritePosts", favouritePosts);
app.use("/api/articleSearch", articleSearch);
app.use("/api/customTopicSearch", customTopicSearch);
app.use("/api/insights", insights);
app.use("/api/followedTopics", followedTopics);

app.get("/wakeup", async (req, res)=>{

  try {
    const title = await wakeupModel.findOne({"title":"john"});
    console.log(title)
    res.send(title)


}
catch (err) {
    throw err.message
    res.send("db error")

}

})
// app.get('*', function(req, res){
//   res.status(404).send("no route")
// });

// error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port# ${port}`);
  console.log(`http://localhost:${port}`);
}
);
