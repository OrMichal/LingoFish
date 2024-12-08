const express = require('express');
const bcrypt = require('bcrypt');
const { error } = require('console');
const fs = require('fs').promises;
const cors = require('cors');
const mongo = require('mongoose');
const { default: mongoose } = require('mongoose');
const jToken = require('jsonwebtoken');
const User = require("./models/User");


mongo.connect('mongodb://localhost:27017/FishyDb')
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("connection error: ", error));

const wordShema = new mongoose.Schema({
  word: String,
  meaning: String
});

const word = mongoose.model("word", wordShema);

const port = 3123;
const app = express();
const secretKey = "your_secret_key";


app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("X-Content-Type-Options", "nosniff");
    next();
});

app.listen(port, () => {
    console.log('hello on port:', port);
});

app.get("word", async (req, res) => {
  try{
    const randWd = await word.aggregate([{$sample: {size: 1} }]);

    if(randWd.length > 0){
      res.json(randWd[0]);
    }else{
      res.status(404).json({message: "No words found"});
    }
  }catch (error){
    console.error("Error", error);
    res.status(500).json({message: "Internal server error"});
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Received login request:", username,",", password); // Debugging

  try {
      const user = await User.findOne({username});
      if (!user) {
          console.log("No user found");
          return res.status(401).json({ message: "Invalid username or password" });
      }

      const isValid = await user.isValidPassword(password);
      if (!isValid) {
          console.log("Password does not match");
          return res.status(401).json({ message: "Invalid username or password" });
      }

      const token = jToken.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
      res.json({ message: "Login successful", token });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
  }
});

