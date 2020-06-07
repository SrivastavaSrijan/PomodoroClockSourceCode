let express = require("express");
let router = express.Router();
const body = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
router.put("/", (req, res, next) => {
  const tasks = req.body;
  console.log(tasks);
  const authHeader = req.headers["authorization"];
  const id = authHeader && authHeader.split(" ")[1];
  knex("users")
    .where("id", "=", id)
    .update({
      // tasks: knex.raw(`tasks || ?::json`, JSON.stringify(tasks)),
      tasks: tasks,
    })
    .then((data) => {
      res.json("Synced notes to server.");
    })
    .catch((err) => {
      res.status(400).json("Unable to sync notes!");
      console.log(err);
    });
});
module.exports = router;
