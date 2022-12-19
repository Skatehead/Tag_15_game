const button = document.querySelector(".btn");
//let stonesIndex = document.querySelectorAll(".stone");
const stoneTransition = document.querySelector(".gameField");

function shuffleStones() {
  const unshuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  const stonesIndex = document.querySelectorAll(".stone");
  let shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  for (let i = 0; i < 16; i++) {
    //stonesArray[i] = shuffled[i];
    stonesIndex[i].style.backgroundImage = "none";
    if (shuffled[i] !== 0) {
      stonesIndex[i].style.backgroundImage = `url(stone_${shuffled[i]}.png)`;
    }

    const atr = document.createAttribute("data-nom");
    atr.value = `${shuffled[i]}`;
    stonesIndex[i].setAttributeNode(atr);
  }
  let rounds = document.querySelector(".rounds");
  rounds.textContent = "0";
}

function swapNodes(node1, node2) {
  let dummy = document.createElement("span");
  node1.before(dummy);
  node2.before(node1);
  dummy.replaceWith(node2);
}

// Checks if there is a blank stone (item = 0) around stone chosen and put the stone there
function processStones(event) {
  const stonesIndex = document.querySelectorAll(".stone");
  // when this function is used as an event handler: this === evt.currentTarget
  const nodeArray = Array.from(stonesIndex);


  const stoneIndex = nodeArray.indexOf(event.target); // index of the stone chosen

  if (stoneIndex > 3) {
    // check blank stone above the stone chosen
    if (nodeArray[stoneIndex - 4].dataset.nom === "0") {
      const promise = event.target.style.transform = "translateY(-100%)";
      stoneTransition.style = "pointer-events: none";
      return;
    }
  }

  if (stoneIndex < 12) {
    // check blank stone beneath the stone chosen
    if (nodeArray[stoneIndex + 4].dataset.nom === "0") {
      event.target.style.transform = "translateY(100%)";
      stoneTransition.style = "pointer-events: none";
      return;
    }
  }

  // check on the right of the stone chosen
  if (
    stoneIndex !== 3 &&
    stoneIndex !== 7 &&
    stoneIndex !== 11 &&
    stoneIndex !== 15
  ) {
    if (nodeArray[stoneIndex + 1].dataset.nom === "0") {
      event.target.style.transform = "translateX(100%)";
      stoneTransition.style = "pointer-events: none";
      return;
    }
  }

  // check on the left of the stone chosen
  if (
    stoneIndex !== 0 &&
    stoneIndex !== 4 &&
    stoneIndex !== 8 &&
    stoneIndex !== 12
  ) {
    if (nodeArray[stoneIndex - 1].dataset.nom === "0") {
      event.target.style.transform = "translateX(-100%)";
      stoneTransition.style = "pointer-events: none";
      return;
    }
  }
}

// Add click listener to the button for restart
button.addEventListener("click", shuffleStones);

// Add a click listener to each stone

stoneTransition.addEventListener("click", processStones);

// when moving of the stone finished - swap corresponding nodes
stoneTransition.addEventListener("transitionend", (event) => {
  let stonesIndex = document.querySelectorAll(".stone");
  let nodeArray = Array.from(stonesIndex);

  if (event.target.style.transform === "translateY(-100%)") {
    swapNodes(
      nodeArray[nodeArray.indexOf(event.target)],
      nodeArray[nodeArray.indexOf(event.target) - 4]
    );
  } else if (event.target.style.transform === "translateY(100%)") {
    swapNodes(
      nodeArray[nodeArray.indexOf(event.target)],
      nodeArray[nodeArray.indexOf(event.target) + 4]
    );
  } else if (event.target.style.transform === "translateX(100%)") {
    swapNodes(
      nodeArray[nodeArray.indexOf(event.target)],
      nodeArray[nodeArray.indexOf(event.target) + 1]
    );
  } else if (event.target.style.transform === "translateX(-100%)") {
    swapNodes(
      nodeArray[nodeArray.indexOf(event.target)],
      nodeArray[nodeArray.indexOf(event.target) - 1]
    );
  }
  stoneTransition.style = "pointer-events: auto";

  let rounds = document.querySelector(".rounds");
  let roundsNum = Number(rounds.textContent) + 1;
  rounds.textContent = roundsNum;
  event.target.style.transform = "none";

  stonesIndex = document.querySelectorAll(".stone");
  nodeArray = Array.from(stonesIndex);
 const currentNodeArray = nodeArray.map((nominal) => {
 return nominal.dataset.nom; 
});

const vinnerNodeArray = [];
for (let i=0; i<16; i++) {
vinnerNodeArray[i] = `${i+1}`}
vinnerNodeArray[15] = "0";
if (currentNodeArray !== vinnerNodeArray) {
 recordVinner();
}
});

function submitChamp(){}

function recordVinner() {
 
  const form = document.querySelector("#name");
  const vinnerMessage = document.querySelector('.vinnerMessage');
  const button = document.querySelector(".submit");
 
  stoneTransition.style = "pointer-events: none";
  vinnerMessage.style.opacity = "1";
  vinnerMessage.style.transform = "translate(-50%, -50%)";
  form.focus();
  button.addEventListener('click', () =>{
    if (form.value !== "") {

      if (!localStorage.getItem("name")) {
        console.log(form.value);
      }
      //console.log(myName);
      form.value = "";
    } else {
      form.focus();
      return;
    }
  })

}

function vinnerCheck() {
 
};

function showTopFive() {
  if (!localStorage.getItem('Player1')) {
    localStorage.setItem('Player1', 'Arnold Schwarzenegger');
    localStorage.setItem('Player1Score', 100);
    localStorage.setItem('Player2', 'Jackie Chan');
    localStorage.setItem('Player2Score', 200);
    localStorage.setItem('Player3', 'Chuck Norris');
    localStorage.setItem('Player3Score', 300);
    localStorage.setItem('Player4', 'Jim Carey');
    localStorage.setItem('Player4Score', 400);
    localStorage.setItem('Player5', 'Mr. Bean');
    localStorage.setItem('Player5Score', 999);  
};
  let players = [];
  for (i=0; i<5; i++) {
    players[i]= {name: localStorage.getItem(`Player${i+1}`), score: localStorage.getItem(`Player${i+1}Score`)} ;
  }
  
  players.sort((a,b) => {
    if ( a.score < b.score ) return -1;
    if ( a.score > b.score ) return 1;
    return 0; });
  
   for (const player of players) {   

    const playerString = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const playerName = document.createTextNode(player.name);
    const playerScore = document.createTextNode(player.score);
    p1.appendChild(playerName);
    p2.appendChild(playerScore);
    playerString.appendChild(p1);
    playerString.appendChild(p2);
    document.querySelector('.top5').appendChild(playerString);
 
    }
 }

// Fill game field with the stones

shuffleStones();

showTopFive();
