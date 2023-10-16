const https=require('https');
const fs = require('fs');
var express = require('express')
var app = express()
const path=require('path')
app.set('view engine', 'pug')
//Instructs the app to get static files relative to the root directory
app.use(express.static(path.join(__dirname, '/')))

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
    data['cards']=cards;
    data['enemies']=enemies;
    data['levels']=levels;
  }
  return data;
}
function shuffleCards() {
  for (let i = data['cards'].length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data['cards'][i], data['cards'][j]] = [data['cards'][j], data['cards'][i]];
  }
}
var data={};
data=loadData();

app.get('/', (req, res) => {
    try {
        shuffleCards();
        console.log(data);
        res.render('game', { data:data})
    } catch(e) {
        console.log(e.message)
    }
  });

app.get('/draw',(req,res) => {
  try {
    console.log('drawing');
    res.json(data['cards']);
    //res.send('hi from pug');
  }
  catch(e) {
    console.log(e.message)
  }
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