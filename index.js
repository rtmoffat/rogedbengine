var express = require('express')
var app = express()
const path=require('path')
app.set('view engine', 'pug')
//Instructs the app to get static files relative to the root directory
app.use(express.static(path.join(__dirname, '/')))

app.get('/', (req, res) => {
    try {
        res.render('game', { title: 'Hey', message: 'Hello there!' })
    } catch(e) {
        console.log(e.message)
    }
  })

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
    const fs = require('fs');
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
var data={};
data=loadData();

app.listen(3000);
console.log("listening");