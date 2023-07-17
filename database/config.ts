import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionString = process.env.DB_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error("Set the db connection in the environment variables!");
    }
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB connected!")
  } catch (error) {
    console.log(error);
    throw new Error("Error while connection to the DB");
  }
};
