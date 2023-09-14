const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json())
require("./database/connection");
const User = require("./model/userSchema");
app.use(require('./router/auth'));

app.listen(process.env.PORT);
