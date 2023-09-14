const mongoose = require("mongoose");
const DB = process.env.DB_NAME;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex:true,
    useUnifiedTopology: true,
    // useFindAndModify:true
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));
