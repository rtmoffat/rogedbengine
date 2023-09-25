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

class player:
    hand=[]
    health=None
    mana=None
    def __init__(self,hand,health,mana):
        self.hand=hand
        self.health=health
        self.mana=mana

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

player1=player(hand=[],health=90,mana=5)
improvised_club=card("improvised_club","weapon",2,6)
for x in range(6):
    player1.hand.append(improvised_club)

troll=enemy("Leroy",50,10)

while (troll.health>0) & (len(player1.hand)>0):
    play=input("Play a card?")
    if play.upper()=="Y":
        player1.hand.pop()
        troll.health-=improvised_club.dmg
    else:
        player1.health-=troll.dmg
    print("Player:"+str(player1.health))
    print("Enemy:"+str(troll.health))
    
if troll.health<=0:
    print("You beat the troll!!")
else:
    print("Ran out of ammo!")
