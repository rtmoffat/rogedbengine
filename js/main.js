/*import { getLocalCards } from '../data/local/cards.js';
import { getLocalEnemies } from '../data/local/enemies.js';
import { getLocalLevels } from '../data/local/levels.js';

function loadData() {
  var data={};
  const location=window.location.hostname;
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
    
    enemies=JSON.parse(fs.readFileSync('../data/enemies.json','utf-8'));
    console.log(enemies);
    
    cards=JSON.parse(fs.readFileSync('../data/cards.json', 'utf8'));
    console.log(cards);
    
    levels=JSON.parse(fs.readFileSync('../data/levels.json', 'utf8'));
    console.log(levels);
    data['cards']=cards;
    data['enemies']=enemies;
    data['levels']=levels;
  }
  return data;
}*/

function initGui() {
  $( function() {
    $( ".draggable" ).draggable({revert:"invalid",revertDuration:200,opacity: 0.35});
    $( ".droppable" ).droppable({
        accept:(draggable)=> {
          console.log("Checking");
          console.log(draggable);
          
          let cCost=parseInt($(draggable).find("div.cardTitle span.cCost").html());
          let playerMana=parseInt($("#mana p").html());
          if (playerMana>=cCost) {
            return true;
          }
          else {
            return false;
          }
        },
        tolerance:"pointer",
        classes: {
            "ui-droppable-hover": "highlightTarget"
            },
        drop: function( event, ui ) {
            //alert('dropped!');
            //check mana level
            var playerMana=parseInt($("#mana p").html())
            var cMana=parseInt($("#"+ui.draggable[0].id+" div.cardTitle span.cCost").html())
            if (playerMana>=cMana) {
              console.log('Dropped');
              $("#thwack")[0].play();
              console.log(event.target.id);//Monster
              console.log(ui.draggable[0].id);//Card
              //("#enemy4 div label")[0].textContent=3
              let eLife=parseInt($("#"+event.target.id+" > div > label").html())
              let cAtk=parseInt($("#"+ui.draggable[0].id+" div.cardTitle span.cDamage").html())
              console.log('eLife='+eLife+' cAtk='+cAtk);
              $("#"+event.target.id+" > div > label").html((eLife-cAtk).toString())
              ui.draggable.remove();
              //Remove the enemy if elimnated
              if ((eLife-cAtk)<=0) {
                event.target.remove();
              }
              playerMana-=cMana;
              $("#mana p").html(playerMana.toString());
            }
            else {
              console.log('insufficient mana!');
              ui.draggable.draggable("option","revert",true);
              ui.draggable.draggable("option","revert","invalid");
            }
        }
      });
    });
}

/*class Deck {
  constructor(cards) {
    this.drawPile = [];
    this.discardPile = [];
    for (const card of cards) {
      this.drawPile.push(card);
    }
  }

  draw() {
    return this.drawPile.pop();
  }

  discard(card) {
    this.discardPile.push(card);
  }

  shuffle(includeDiscardPile) {
    if (includeDiscardPile) {
      this.drawPile = this.drawPile.concat(this.discardPile);
      this.discardPile = [];
    }
    for (let i = this.drawPile.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.drawPile[i], this.drawPile[j]] = [this.drawPile[j], this.drawPile[i]];
    }
  }
}

class Player {
  constructor(hand, health, mana, drawLimit = 6, handSizeLimit = 6) {
    this.hand = hand;
    this.health = health;
    this.mana = mana;
    this.drawLimit = drawLimit;
    this.handSizeLimit = handSizeLimit;
  }

  resetMana() {
    this.mana = 6;
  }

  adjustLifeTotal(amt) {
    this.health+=amt;
  }
}

class Enemy {
  constructor(name, health, dmg) {
    this.name = name;
    this.health = health;
    this.dmg = dmg;
  }

  adjustLifeTotal(amt) {
    this.health+=amt;
  }
}

class Card {
  constructor(name, type, cost, dmg) {
    this.name = name;
    this.type = type;
    this.cost = cost;
    this.dmg = dmg;
  }
}*/

let enemies;
let cards;
let levels;
let data={};

/*data=loadData();
cards=data['cards'];
enemies=data['enemies'];
levels=data['levels'];
const pDeck = new Deck(cards);
console.log(pDeck.drawPile);
pDeck.shuffle();
console.log(pDeck.drawPile);
const player1 = new Player([], 90, 6);
console.log(player1.health)*/
initGui();