const mongoose = require("mongoose");
const DB = process.env.DB_NAME;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("database connection", err));
