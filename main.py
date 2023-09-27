import json
import random

cards=None

with open('./cards.json') as jsonFile:
    cards=json.load(jsonFile)

class deck:
    drawPile=[]
    discardPile=[]
    def __init__(self,cards):
        for card in cards:
            self.drawPile.append(card)
    def draw(self):
        return self.drawPile.pop()

class player:
    hand=[]
    health=None
    mana=None
    def __init__(self,hand,health,mana,drawLimit=6,handSizeLimit=6):
        self.hand=hand
        self.health=health
        self.mana=mana
        self.drawLimit=drawLimit
        self.handSizeLimit=handSizeLimit
    def resetMana(self):
        self.mana=6

class enemy:
    name=""
    health=None
    dmg=None
    def __init__(self,name,health,dmg):
        self.name=name
        self.health=health
        self.dmg=dmg

class card:
    name=""
    type=""
    cost=None
    dmg=None
    def __init__(self,name,type,cost,dmg):
        self.name=name
        self.type=type
        self.cost=cost
        self.dmg=dmg

pDeck=deck(cards)
print(pDeck.drawPile)
random.shuffle(pDeck.drawPile)
print(pDeck.drawPile)

#Init player
player1=player(hand=[],health=90,mana=6)

#Draw up to draw limit
for i in range(player1.drawLimit):
    player1.hand.append(pDeck.draw())

troll=enemy("Leroy",50,10)

while (troll.health>0) & (len(player1.hand)>0):
    play=input("Play a card?")
    if play.upper()=="Y":
        #Display player hand
        for cardIndex in range(len(player1.hand)):
            print(str(cardIndex)+str(player1.hand[cardIndex]['Name']))
        choice=input("Choose a card to play:")
        if (player1.hand[int(choice)]['Cost']<=player1.mana):
            troll.health-=player1.hand[int(choice)]['Damage']
            player1.mana-=player1.hand[int(choice)]['Cost']
            player1.hand.pop(int(choice))
        else:
            print("Insufficient mana!")
    else:
        player1.resetMana()
        player1.health-=troll.dmg
    print("Player:"+str(player1.health))
    print("Enemy:"+str(troll.health))
    print("Player Mana:"+str(player1.mana))
if troll.health<=0:
    print("You beat the troll!!")
else:
    print("Ran out of ammo!")
