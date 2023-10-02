//Auto-refactored code from ChatGPT from original Python script
const fs = require('fs');
const readline = require('readline');

let cards;

fs.readFile('../data/cards.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading cards.json:', err);
    return;
  }
  cards = JSON.parse(data);

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

  // Init player
  const player1 = new Player([], 90, 6);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function pDraw() {
    // Draw up to draw limit
    for (let i = 0; i < player1.drawLimit; i++) {
      if (player1.hand.length < player1.drawLimit) {
        // Reshuffle discard pile if draw pile is empty
        if (pDeck.drawPile.length === 0) {
          pDeck.shuffle(true);
        }
        player1.hand.push(pDeck.draw());
      }
    }
  }

  async function main() {
    const troll = new Enemy('Leroy', 50, 10);

    while (troll.health > 0) {
      // Draw cards up to hand limit
      pDraw();
      const play = await askQuestion('Play a card? (Y/N) ');

      if (play.toUpperCase() === 'Y') {
        // Display player hand
        for (let cardIndex = 0; cardIndex < player1.hand.length; cardIndex++) {
          const card = player1.hand[cardIndex];
          console.log(`${cardIndex} ${card.Name} ${card.Cost}`);
        }
        const choice = await askQuestion('Choose a card to play: ');
        if (player1.hand[choice].Cost <= player1.mana) {
          troll.health -= player1.hand[choice].Damage;
          player1.mana -= player1.hand[choice].Cost;
          pDeck.discard(player1.hand[choice]);
          player1.hand.splice(choice, 1);
        } else {
          console.log('Insufficient mana!');
        }
      } else {
        player1.resetMana();
        player1.health -= troll.dmg;
      }

      console.log(`Player: ${player1.health}`);
      console.log(`Enemy: ${troll.health}`);
      console.log(`Player Mana: ${player1.mana}`);
    }

    if (troll.health <= 0) {
      console.log('You beat the troll!!');
    } else {
      console.log('Ran out of ammo!');
    }

    rl.close();
  }

  function askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, resolve);
    });
  }

  main();
});
