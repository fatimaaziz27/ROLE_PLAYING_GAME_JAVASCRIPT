let xp = 0;
let health =100;
let gold = 50;
let current_weapon_index = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const xp_text = document.querySelector("#xpText");
const health_text = document.querySelector("#healthText");
const gold_text = document.querySelector("#goldText");
const monster_stats = document.querySelector("#monsterStats");
const monster_name = document.querySelector("#monsterName");

const monster_health = document.querySelector("#monster_health");
const monster_health_text = document.querySelector("#monster_health_text");

function go_store() {
  button1.innerText = "Buy 10 health (10 gold)";
  button2.innerText = "Buy weapon (30 gold)";
  button3.innerText = "Go to town square";
  
  button1.onclick = buyHealth;
  button2.onclick = buyWeapon;
  button3.onclick = goTown;
}

function go_cave() {
  console.log("Going to cave.");

}

function fight_dragon() {
  console.log("Fighting dragon.");

}

// initialize buttons
button1.onclick = go_store;
button2.onclick = go_cave;
button3.onclick = fight_dragon;
