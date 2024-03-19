let xp = 0;
let health = 100;
let gold = 20;
let weaponPrice = 30;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const picSection = document.querySelector("#pictureSection");
const img = picSection.querySelector('img');

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterLvl = document.querySelector("#monsterLvl");
const monsterStrength = document.querySelector("#monsterStrength");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 20 },
  { name: 'mace', power: 35},
  { name: 'axe', power: 69 },
  { name: 'claw hammer', power: 90 },
  { name: 'sword', power: 125 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 10
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  },
  {
    name:"Guard",
    level: 13,
    health: 180
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Shadowthorn", "Easy Street"],
    "button functions": [goStore, goCave, fightDragon, easyStreet],
    text: "You are in the town square.You see a path that splits into four directions."
  },
  {
    // how do we get the buy weapon to update on the current price?
    name: "store",
    "button text": ["Buy 15 health (20 Yen)" , "Buy weapon  (" + weaponPrice + " Yen)", "Go to town square", "Inventory"],
    "button functions": [buyHealth, buyWeapon, goTown, inventoryCheck],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square", "Fight the Guard"],
    "button functions": [fightSlime, fightBeast, goTown, fightGuard],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },{
    name: "kill monster",
    "button text": ["Go back to cave", "Go to town square", "Casino"],
    "button functions": [goCave, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find Yen.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["Number: 2", "Number: 8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Welcome to the casino! Pick a number 2 or 8. If you they're in the list of 10 random numbers, you win 20 gold. If not, you lose 20 health."
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
  button3.style.display = "inline";
  button4.style.display = "inline";
  img.src = "./images/townSquare.png"
}

function goStore() {

  update(locations[1]);
  button4.style.display = "inline";
}

function goCave() {
  update(locations[2]);
  button4.style.display = "inline";
}
const storeIndex = locations.findIndex(location => location.name === "store");

function buyHealth() {
  if (health >= 200) {
    if (gold >= 75) {
      gold -= 75;
      health += 50;
      goldText.innerText = gold;
      healthText.innerText = health;

      // Update the button text directly in the store location
      if (storeIndex !== -1) {
        locations[storeIndex]["button text"][0] = "Buy 50 health (75 Yen)";
        text.innerText = "You have full health. You can buy 50 health for 75 Yen.";

        // Update the button text in the store location
        update(locations[storeIndex]);
      }
    } else {
      text.innerText = "You do not have enough Yen to buy health.";
    }
  } else {
    if (gold >= 20) {
      gold -= 20;
      health += 15;
      goldText.innerText = gold;
      healthText.innerText = health;
    } else {
      text.innerText = "You do not have enough Yen to buy health.";
    }
  }
}




function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= weaponPrice) {
      gold -= weaponPrice;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have the: " + inventory;
      weaponPrice += 30;
      inventoryCheck();
 // Update the "Buy Weapon" button text directly in the store location

 
 // the store index is the index of the store location in the locations array

 if (storeIndex !== -1) {  // if the store location is found
   locations[storeIndex]["button text"][1] = "Buy Weapon for " + weaponPrice + " Yen";
 } // update the button text for the "Buy Weapon" button in the store location


      button2.innerText = "Buy weapon  (" + weaponPrice + " Yen)";
     
    } else {
      text.innerText = "You do not have enough Yen to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 Yen";
    button2.onclick = sellWeapon;
  }
}

function inventoryCheck() {
 text.innerText = "You now have a " + weapons[currentWeapon].name + ". It has a power of " + weapons[currentWeapon].power;
}

function easyStreet () {
  restart();
  xp = 0;
  health = 200;
  gold = 75;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  monsterStats.style.background = "#c70d0d";
  xpText.style.color = "blue";
  healthText.style.color = "green";
  goldText.style.color = "yellow";
  text.style.color = "aqua";
  weaponPrice = 30;
  slimeDefeats = 0;
  text.innerText = "You are on Easy Street. You have 200 health, 75 Yen, and a stick. You are ready to go on an adventure!";
// Function declaration for getBuyWeaponButtonText
}



function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  button4.style.display = "none";
  fighting = 0;
  img.src = "./images/slimeFight.png"
  goFight();
  text.innerText = " "
  text.innerText = "These innocent looking slime are attacking you!"
}

function fightBeast() {
  button4.style.display = "none";
  fighting = 1;
  goFight();
  img.src = "./images/fangedFight.png"
  text.innerText = " "
  text.innerText = "You are fighting some scary looking beast"
}
function fightGuard() {
  button4.style.display = "none";
  fighting = 3;
  goFight();
}
function fightDragon() {
  button3.style.display = "none";
  fighting = 2;
  button4.style.display = "none";
  goFight();
  monsterStats.style.background = "linear-gradient(to right, #ff0000, #00ff00, #0000ff)";
  monsterStats.style.color = "white";
  text.innerText = " ";
  text.innerText = "You are fighting the dragon. You can't run from this fight.";
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterStrength.innerText = getMonsterAttackValue(monsters[fighting].level);
  monsterLvl.innerText = monsters[fighting].level;
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 2.5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}
let slimeDefeats = 0;


function defeatMonster() {
  
    if (monsters[fighting].name === "slime") {
      slimeDefeats++;
      if (slimeDefeats === 8) {
        // Update the button text or hide the button when defeating the slime 5 times
        const slimeIndex = locations.findIndex(location => location.name === "cave");
        if (slimeIndex !== -1) {
          locations[slimeIndex]["button text"][0] = "No more slimes for you!";
          locations[slimeIndex]["button functions"][0] = undefined;
        }
      }
    }
    const originalXPGain = Math.floor(monsters[fighting].level);
    const adjustedXPGain = Math.floor(monsters[fighting].level * 0.5);

    console.log(`Original XP Gain: ${originalXPGain}`);
    console.log(`Adjusted XP Gain: ${adjustedXPGain}`);

    if (xp >= 10) {
        xp += adjustedXPGain;
    } else {
        xp += originalXPGain;
    }
    health += 2;
    healthText.innerText = health;
    xpText.innerText = xp;
    killIndex = locations.findIndex(location => location.name === "kill monster");
    locations[killIndex].text = "You killed The " + monsters[fighting].name + ". You gain " + originalXPGain + " experience points and find Yen.";
    gold += Math.floor(monsters[fighting].level * 6.7);
    goldText.innerText = gold;
    update(locations[4]);
}



function lose() {
  update(locations[5]);
  button4.style.display = "none";
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 20;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  monsterStats.style.background = "#c70d0d";
  xpText.style.color = "black";
  healthText.style.color = "black";
  goldText.style.color = "black";
  text.style.color = "white";
  weaponPrice = 30;
  slimeDefeats = 0;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "the number " + guess + " is in the list. You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "the number " + guess + " isnt in the list! You lose 20 health!";
    health -= 20;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}