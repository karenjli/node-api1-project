// implement your API here
const express = require("express");
const db = require("./data/db");
const server = express();

server.get("/", (req, res) => {
  res.send("IT'S WORKING!");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});

const port = 5000;

server.listen(port, () => {
  console.log("API is listening");
});
