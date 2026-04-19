import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstances = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
    );
    console.log(
      `MongoDB Database connect | DB Host link :- ${connectionInstances.connection.host}`,
    );
  } catch (error) {
    console.log(`MongoDB Database failed to connect ${error}`);
    process.exit(1);
  }
};

export { connectDB };
