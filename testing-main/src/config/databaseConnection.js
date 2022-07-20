import mongoose from "mongoose";
const connectDatabase = async () => {

    try {
        
        // await mongoose.connect('mongodb://localhost:27017/cognilium');
        await mongoose.connect(process.env.DB_CONNECTION_STRING,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        //  await mongoose.connect('mongodb://43.251.253.107:1600/contentgizmo');
        // await mongoose.connect('mongodb://u7cvrwruvcbgxsvqlazu:ssctswlsweaxy6j9nzjr@bpwcrewwozp7mtr-mongodb.services.clever-cloud.com:27017/bpwcrewwozp7mtr'); console.log("database connected without any issue");
        console.log("MONGO-DB CONNECTED SUCCESSFULLY");
    } catch (err) {
        console.log("ERROR OCCOURED WHILE CONNECTING TO DATABASE", err);
    }
};

export default connectDatabase;
