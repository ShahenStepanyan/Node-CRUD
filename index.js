const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://shahenstepanyan2018:shag.2005.@basa.qwhxadb.mongodb.net/blog?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

connect();


const cors = require("cors")

app.use(cors())

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Create a User model
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const PostSchema = new mongoose.Schema({
  title: String,
  body: String
})


const Post = mongoose.model("Post", PostSchema)
const User = mongoose.model('User', UserSchema);

// Express middleware to parse JSON
app.use(express.json());

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });

    if (user) {
      
      if (user.password === password) {
        // Create a JWT token
        const token = jwt.sign({ email }, 'secret-key');

        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in' });
  }
});


app.get('/data', async (req, res) => {
  const collection = client.db('blog').collection('data');
  const data = await collection.find().toArray();
  res.json(data);
});

app.post('/create', async (req, res) => {
  const collection = client.db('blog').collection('data');
  const newData = req.body;
  const result = await collection.insertOne(newData);
  res.json(result);
});


// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'secret-key', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}



// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
