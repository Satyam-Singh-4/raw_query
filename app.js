const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
//const con = require("./Configuration/db");
const router = require("./Router/router");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

async function run() {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port no:${process.env.PORT}`);
  });
}

run();
