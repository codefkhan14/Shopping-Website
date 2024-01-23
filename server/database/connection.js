const mongoose = require("mongoose");
// const DB = process.env.DB_NAME;
const DB =
  "mongodb+srv://furkanrangrej200:furkan123@cluster0.yoqmgpi.mongodb.net/BandhejHub?retryWrites=true&w=majority";

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("database connection", err));
