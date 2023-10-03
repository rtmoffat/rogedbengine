function initGui() {
  $( function() {
    $( ".draggable" ).draggable({revert:"invalid",revertDuration:200,opacity: 0.35});
    $( ".droppable" ).droppable({
        tolerance:"pointer",
        classes: {
            "ui-droppable-hover": "highlightTarget"
            },
        drop: function( event, ui ) {
            //alert('dropped!');
            $("#thwack")[0].play();
            ui.draggable.remove();
        }
      });
    });
}

const fs = require('fs');
const readline = require('readline');

let enemies;
enemies=JSON.parse(fs.readFileSync('../data/enemies.json','utf-8'))
console.log(enemies)

let cards;
cards=JSON.parse(fs.readFileSync('../data/cards.json', 'utf8'))
console.log(cards)

class Deck {
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
}

class Enemy {
  constructor(name, health, dmg) {
    this.name = name;
    this.health = health;
    this.dmg = dmg;
  }
}

class Card {
  constructor(name, type, cost, dmg) {
    this.name = name;
    this.type = type;
    this.cost = cost;
    this.dmg = dmg;
  }
}

const pDeck = new Deck(cards);
console.log(pDeck.drawPile);
pDeck.shuffle();
console.log(pDeck.drawPile);
const player1 = new Player([], 90, 6);
console.log(player1.health)
initGui();