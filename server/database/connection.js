// const mongoose = require('mongoose');
// const DB = process.env.DB_NAME;
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("connection successful");
//   })
//   .catch((err) => console.log("database connection", err));


  const mongoose = require('mongoose');
const uri = process.env.DB_NAME;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
