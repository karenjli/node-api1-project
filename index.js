// implement your API here
const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("IT'S WORKING!");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)

    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.send(user);
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The users information could not be retrieved.",
      });
    });
});

server.post("/api/users", (req, res) => {
  const dbData = req.body;
  if (!dbData.name || !dbData.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(dbData)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database",
        });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const deleteId = req.params.id;
  db.remove(deleteId)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const updateId = req.params.id;
  const dbUpdateData = req.body;

  if (!dbUpdateData.name || !dbUpdateData.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.update(updateId, dbUpdateData)
      .then(user => {
        res.json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

const port = 5000;

server.listen(port, () => {
  console.log("API is listening");
});
