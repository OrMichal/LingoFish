const express = require('express');
const bcrypt = require('bcrypt');
const { error } = require('console');
const fs = require('fs').promises;
const cors = require('cors');

const port = 3123;
const app = express();
const filePathDe = "./zdroje/nemeckaSlova.txt";
const filePathCz = "./zdroje/ceskaSlova_doNemciny.txt";

const users = [];

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("X-Content-Type-Options", "nosniff");
    next();
});


function getRandomWord(words) {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}


app.get('/word', (req, res) => {
  fs.readFile(filePathDe, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    const words = data.split('\n').filter(Boolean);
    const word = getRandomWord(words);
    res.send(word);
  });
});

app.get('/preklady', async (req, res) => {
    try {
        var DeWrdsSrc = await fs.readFile("./zdroje/nemeckaSlova.txt", "utf-8");
        var DeWrds = DeWrdsSrc.split("\n");

        var CzWrdsSrc = await fs.readFile("./zdroje/ceskaSlova_doNemciny.txt", "utf-8");
        var CzWrds = CzWrdsSrc.split("\n");
        res.json({

            "firstDe": DeWrds[0],
            "secondDe": DeWrds[1],

            "firstCz": CzWrds[0],
            "secondCz": CzWrds[1]
            
        });
    } catch (error) {
        console.error('Chyba při čtení souboru:', error.message);
        res.status(500).json({ error: 'Chyba při načítání dat' });
    }
});


app.get('/users', (req, res) => {
    res.json({
        user: 'ivan',
        password: 'password1'
    })
});

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
      } catch {
        res.status(500).send()
      }
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success')
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
  })
  


app.listen(port, () => {
    console.log('hello on port:', port);
})
