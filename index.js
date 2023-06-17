const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://shahenstepanyan2018:shag.2005.@basa.qwhxadb.mongodb.net/blog?retryWrites=true&w=majority"
);
const { ObjectId } = require("mongodb");

async function connect() {
  try {
    await client.connect();

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
}

connect();

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.put("/api/profile/:id", async (req, res) => {
  const collection = client.db("blog").collection("users");
  const updateData = req.body;
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateData }
  );
  res.json({ message: "Data updated" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect();

    const db = client.db("blog");

    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ username, password });

    if (user) {
      res.send({
        succes: true,
      });
    } else {
      res.send("Invalid username or password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("An error occurred");
  } finally {
    // await client.close();
  }
});

app.get("/data", async (req, res) => {
  const collection = client.db("blog").collection("data");
  const data = await collection.find().toArray();
  res.json(data);
});

app.post("/api/create", async (req, res) => {
  const collection = client.db("blog").collection("data");
  const newData = req.body;
  const result = await collection.insertOne(newData);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "secret-key", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

app.delete("/api/data/:id", async (req, res) => {
  const collection = client.db("blog").collection("data");
  const result = await collection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({ message: "Data deleted" });
});

app.put("/api/update/:id", async (req, res) => {
  const collection = client.db("blog").collection("data");
  const updateData = req.body;
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateData }
  );
  res.json({
    message: "Data updated",
    data: updateData,
  });
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const collection = client.db("blog").collection("data");
    const result = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });
    res.json({
      title: result.title,
      body: result.body,
    });
  } catch (error) {}
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
