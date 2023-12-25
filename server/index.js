const dotenv = require("dotenv");
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());

require("./database/connection");
require("./model/userSchema");
require("./model/productSchema");
app.use(require("./router/auth"));

app.listen(process.env.PORT || 5000);

function pingLink() {
  const linkToPing = "https://bandhejhub.onrender.com/api/allProductdata"; // Replace with the link you want to ping
  let data = axios.get(linkToPing);
  data.then((res) => {});
}

// Ping the link every 11 minutes (10 minutes = 600,000 milliseconds)
const pingInterval = 11 * 60 * 1000;
setInterval(pingLink, pingInterval);
