let xp = 0;
let health =100;
let gold = 50;
let current_weapon_index = 0;
let fighting;
let monster_health;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const xp_text = document.querySelector("#xp_text");
const health_text = document.querySelector("#health_text");
const gold_text = document.querySelector("#gold_text");
const monster_stats = document.querySelector("#monster_stats");
const monster_name = document.querySelector("#monster_name");

const monster_health = document.querySelector("#monster_health");
const monster_health_text = document.querySelector("#monster_health_text");

// initialize buttons
button1.onclick = go_store;
button2.onclick = go_cave;
button3.onclick = fight_dragon;

const weapons = [
  {name: "stick" , power: 5},
  {name: "dagger" , power: 30},
  {name: "claw_hammer" , power: 50},
  {name:"sword" , power: 100}
  ];


const locations = [
  {
    name:"town square",
    button_text:["Go to store" , "Go to cave" , "Fight dragon"],
    button_function:[go_store , go_cave , fight_dragon],
    text:"You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name:"store",
    button_text:["Buy 10 health (10 gold)" , "Buy weapon (30 gold)" , "Go to town square"],
    button_function:[buy_health , buy_weapon , go_town],
    text:"You enter the store."
  },
  {
    name:"cave",
    button_text:["Fight slime", "Fight fanged beast" , "Go to town square"],
    button_function:[fight_slime, fight_beast,go_town],
    text:"You enter the cave. You see some monsters."
  },
  {
    name:"fight",
    button_text:["Attack", "Dodge", "Run"],
    button_function:[attack, dodge , go_town],
    text:"You are fighting a monster."
  },
  {
    name:"kill_monster",
    button_text:["Go to town square" , "Go to town square" , "Go to town square"],
    button_function:[go_town , go_town , go_town],
    text:"The monster screams \"Arg!\" as it dies. You gain experience points and find gold."
  },
  {
    name:"lose",
    button_text:["REPLAY?" , "REPLAY?" , "REPLAY?"],
    button_function:[restart , restart , restart],
    text:"You die. &#x2620;"
  },
  {
    name:"win",
    button_text:["REPLAY?" , "REPLAY?" , "REPLAY?"],
    button_function:[restart , restart , restart],
    text:"You defeat the dragon! YOU WIN THE GAME! 🎉"
  }
  
];


const monsters = [
  {"slime": 2 , health: 15},
  {"fanged_beast": 8 , health: 60},
  {"dragon": 20 , health: 300}
];

function go_town() {
  update(locations[0]);
}

function go_store() {
  update(locations[1]);
}

function go_cave() {
  update(locations[2]);
}


function go_fight(){
  update(locations[3]);
  monster_health = monsters[fighting].health;
  monster_stats.style.display = "block";
  monster_name.innerText = monsters[fighting].name;
  monster_health_text.innerText = monster_health;
}

function fight_slime() {
  fighting = 0;
  go_fight();
}

function fight_beast() {
  fighting = 1;
  go_fight();
}

function fight_dragon() {
  fighting = 2;
  go_fight();
}

function attack(){
  text.innerText = "The " + monster_name +"attacks.";
  text.innerText += " You attack it with your " + weapons[current_weapon_index].name + ".";
  health -= getmonsters_attack_value(monsters[fighting].level);
  
  if (is_monster_health()){
    monster_health -= weapons[current_weapon_index].power + Math.floor(Math.random() * xp) + 1;
  }

  health_text.innerText = health;
  monster_health_text.innerText = monster_health;
  
  if (health <= 0){
    lose();
  }
  else if(monster_health <= 0){
    if(fighting === 2){
      win_game();
    }
    else{
    defeat_monster();
    }
  }
}

function monsters_attack_value(level){
  const hit = (level * 5) - (Math.floor(Math.random()*xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function dodge(){
  text.innerText = "You dodge the attack from the " + monster[fighting].name;
}

function lose(){
  update(locations[6]);
}

function win_game(){
  update(locations[6]);
}

function defeat_monster(){
  gold += Math.floor(monsters[fighting].level*6.7);
  xp += monsters[fighting].level;
  gold_text.innerText = gold;
  xp_text.innerText = xp;
  update(locations[4]);
}

function sell_weapon(){
  if (inventory.length > 1){
    gold += 15;
    gold_text.innerText = gold;
    let current_weapon = inventory.shift();
    text.innerText = "You sold a " + current_weapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  }
  else {
  text.innerText = "Don't sell your only weapon!";
  }
}

function buy_weapon() {
  if(current_weapon_index < weapons.length-1){
    if (gold >= 30){
      gold -= 30;
      current_weapon_index ++;
      gold_text.innerText = gold;
      let new_weapon = weapons[current_weapon_index].name;
      text.innerText = "You now have a " + new_weapon + ".";
      inventory.push(new_weapon);
      text.innerText += "In your inventory you have: " + inventory;
    }
    else{
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  }
  else{
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sell_weapon();
  }
}

function buy_health() {
  if (gold >= 10) {
    gold -=10;
    health +=10;
    gold_text.innerText = gold;
    health_text.innerText = health;
  }
  else{
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function update(location) {
  monster_stats.style.display = "none";
  button1.innerText = location["button_text"][0];
  button2.innerText = location["button_text"][1];
  button3.innerText = location["button_text"][2];
  
  button1.onclick = location["button_function"][0];
  button2.onclick = location["button_function"][1];
  button3.onclick = location["button_function"][2];

  text.innerHTML = location.text;
}

function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  current_weapon_index = 0;
  inventory = ["stick"];
  gold_text.innerText = gold;
  health_text.innerText = health;
  xp_text.innerText = xp;
  go_town();
}


















