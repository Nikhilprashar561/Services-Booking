import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/connection.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

console.log(`Data is coming from env ${PORT}`)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Started at PORT No. ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server Crashed ${err}`);
  });
