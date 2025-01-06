const express = require('express');
const bcrypt = require('bcrypt');
const { error } = require('console');
const fs = require('fs').promises;
const cors = require('cors');
const mongo = require('mongoose');
const { default: mongoose } = require('mongoose');
const jToken = require('jsonwebtoken');
const User = require("./models/User");
const Story = require("./models/Story");
const story = require('./models/Story');
const Grammar = require("./models/Grammar");
const Word = require("./models/Word");


mongo.connect('mongodb://localhost:27017/FishyDb')
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("connection error: ", error));

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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Received login request:", username,",", password); // Debugging

  try {
      const user = await User.findOne({username});
      if (!user) {
          console.log("No user found");
          return res.status(401).json({ message: "Invalid username or password" });
      }
      /*
      const isValid = await user.isValidPassword(password);
      if (!isValid) {
          console.log("Password does not match");
          console.log("origo: ", user.password);
          console.log("my: ", password);
          return res.status(401).json({ message: "Invalid username or password" });
      }*/

      if(user.password !== password){
        console.log("wrong password");
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const token = jToken.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: "1h" });
      res.json({ message: "Login successful", token });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  const {username, password} = req.body;

  console.log("Received register request: ", username, " ", password);
  await bcrypt.hash(password, 10);

  try {

    const user = await User.findOne({username});
    /*
    if(user.password == password){
      return res.status(401).json({message: "This password is already using another user"});
    }*/

    if(user){
      console.log("user", username, "already exists");
      return res.status(401).json({message: "User with this username already exists!"});
    }

    User.insertMany([{username, password}]);
    res.json({message: "Account created successfuly"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
});

app.post("/lQuestons", async (req, res) => {
  
  try {
    const { exName } = req.body;
  
    console.log("Received a story request", exName);
    const storr = await story.findOne({heading: exName});
    
    if(!storr){
      return res.status(404).json({message: "nenašel jsem to :("});
    }
    
    console.log("found it!", storr);
  
    return res.status(201).json({questions: storr.questions, answers: storr.answers, allAnswers: storr.allAnswers});
    
  } catch (error) {
    console.error(error);
  }
});

app.post("/rQuestons", async (req, res) => {
  
  try {
    const { exName } = req.body;
  
    console.log("Received a story request", exName);
    const storr = await story.findOne({heading: exName});
    
    if(!storr){
      return res.status(404).json({message: "nenašel jsem to :("});
    }
    
    console.log("found it!", storr);
  
    return res.status(201).json({questions: storr.questions, answers: storr.answers, allAnswers: storr.allAnswers, content: storr.content});
    
  } catch (error) {
    console.error(error);
  }
});

app.post("/storrHeadings", async (req, res) => {
  try {
    const {querr} = req.body;
    const storrHeads = await story.find({type: querr}, 'heading');
    console.log(storrHeads);
    const headings = storrHeads.map((s) => s.heading);

    return res.status(200).json({ headings });
  } catch (error) {
    console.error("Chyba při načítání headingů:", error);
    return res.status(500).json({ message: "Chyba serveru při načítání headingů." });
  }
});

app.post("/answCheck", async (req, res) => {
  try {
    const { answs, heading } = req.body;

    console.log("Received a answer correction request", answs, heading);
    console.log("---");

    if (!Array.isArray(answs)) {
      return res.status(400).json({ message: "Odpovědi musí být pole." });
    }

    const storr = await story.findOne({ heading });

    if (!storr) {
      return res.status(404).json({ message: "Příběh nebyl nalezen." });
    }

    let points = 0;

    answs.forEach((answ) => {
      if (storr.answers.includes(answ)) {
        points += 1;
      }
    });

    return res.status(201).json({ points, answse: storr.answers });
  } catch (error) {
    console.error("Error while checking answers:", error);
    return res.status(500).json({ message: "Internal server error while checking your answers" });
  }
});

app.post("/grammarLvls", async (req, res) => {
  try {
    const lvlArr = await Grammar.distinct("level");
    return res.status(201).json({lvlArr});
  } catch (error) {
    console.log(error);
  }
});

app.post("/getGrammar", async (req, res) => {
  try {
    const {level} = req.body;
    const gramArr = await Grammar.find({level}, {point: 1});
    let resultArr = [];
    gramArr.forEach((g) => {
      resultArr.push(g.point);
    });
    console.log(resultArr);
    res.status(201).json({resultArr});
  } catch (error) {
    console.log("ups", error);
  }
});

app.post("/getGramPt", async (req, res) => {
  try {
    const { gram } = req.body;
    console.log("received grammar: ", gram);
  
    const querr = await Grammar.findOne({point: gram}, {description: 1, _id: 0});
    console.log(querr);
    const result = querr.description;
    console.log(result);
    return res.status(201).json({result});
  } catch (error) {
    console.log("ups", error);
  }
});

app.post("/getRandWord", async(req, res) => {
  try {
    const wrd = await Word.aggregate([{$sample: {size: 1}}])
    const word = wrd[0].word;
    return res.status(201).json({word});
  } catch (error) {
    console.log(error);
  }
}); 