#!/usr/bin/env node
const https=require('https');
const fs = require('fs');
var express = require('express')
var app = express()
const path=require('path')
const sqlite3 = require('sqlite3');
const cors=require('cors')
app.set('view engine', 'pug')
//Instructs the app to get static files relative to the root directory
app.use(express.static(path.join(__dirname, '/')))
//Rquired to parse post data
app.use(express.json());

function loadData() {
  var data={};
  //const location=window.location.hostname;
  const location="";
  if (location=='localhost' || location=='127.0.0.1') {
    console.log('Loading locally');
    cards=getLocalCards();
    enemies=getLocalEnemies();
    levels=getLocalLevels();
    console.log(cards);
    console.log(enemies);
    console.log(levels);
    data['cards']=cards;
    data['enemies']=enemies;
    data['levels']=levels;
  }
  else {
    console.log('Loading remotely');
    //const fs = require('fs');
    const readline = require('readline');
    
    enemies=JSON.parse(fs.readFileSync('./data/enemies.json','utf-8'));
    console.log(enemies);
    
    cards=JSON.parse(fs.readFileSync('./data/cards.json', 'utf8'));
    console.log(cards);
    
    levels=JSON.parse(fs.readFileSync('./data/levels.json', 'utf8'));
    console.log(levels);

    player=JSON.parse(fs.readFileSync('./data/player.json', 'utf8'));
    console.log(player);

    data['cards']=cards;
    data['enemies']=enemies;
    data['levels']=levels;
    data['player']=player;
  }
  data['drawPile']=data['cards'];
  data['discardPile']=[];
  //data['player']={'maxLife':100,'maxMana':5,'currentLife':100,'currentMana':5,'handLimit':6};
  data['hand']=[];
  return data;
}

function shuffleCards() {
  for (let i = data['cards'].length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data['cards'][i], data['cards'][j]] = [data['cards'][j], data['cards'][i]];
  }
}
//**** */
//***Start here!!!***/

var data={};
data=loadData();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//Allows client to post an update in JSON format
//Returns JSON response to client
//req.body contains the data sent in the request.
app.post('/update',cors(corsOptions),(req,res)=> {
  console.log("req contains:");
  console.log(req.body);
  switch (req.body.action) {
    case "discard": {
      console.log("discarding");
    }
  }
  res.send({"test":5});
})
app.get('/newGame',(req,res)=> {
  try {
    data=loadData();
    shuffleCards();
    saveGame();
    res.render('game',{data:data})
  } catch(e) {
    console.log(e.message)
  }
});

function saveGame() {
  console.log("saving");
  const db = new sqlite3.Database('./db/data.sqlite3');
  db.serialize(() => {
    const stmt=db.prepare('insert into games (data) values (?)');
    stmt.run(JSON.stringify(data));
    stmt.finalize();
    //db.run('insert into games (data) values ('+JSON.stringify(data)+')');
  })
  console.log("saved!");
}

app.get('/', (req, res) => {
    try {
        shuffleCards();
        console.log(data);
        res.render('game', { data:data})
    } catch(e) {
        console.log(e.message)
    }
  });

app.get('/draw/:numCards',(req,res) => {
  try {
    for (x=0;x<req.params.numCards;x++) {
      data['hand'].push(data["drawPile"].pop());
    }
    console.log('drawing');
    res.json(data);
    //res.send('hi from pug');
  }
  catch(e) {
    console.log(e.message)
  }
});
//
app.get('/discard/:handCardIndex',(req,res) => {
  if (req.params.handCardIndex=='ALL') {
    data['hand']=[];
  } else {
    data['hand'].splice(req.params.handCardIndex,1);
  }
  res.json(data);
})

//Returns the state of the game
app.get('/state',(req,res) => {
  res.json(data);
});

https
  .createServer(
    {
      key:fs.readFileSync("/certs/schplorph.com.key"),
      cert:fs.readFileSync("/certs/schplorph.com.cert")
    },
    app)
  .listen(3000,() => {
    console.log('server running on port 3000')
  });
//app.listen(3000);
console.log("listening");