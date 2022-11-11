const button = document.querySelector(".btn");
let stonesIndex = document.querySelectorAll(".stone");
const stoneTransition = document.querySelector(".gameField");
const stonesArray = [];
let nodeArray = [];
let stoneInTransition = 100;
let direction;

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
  nodeArray = Array.from(stonesIndex);

  const stoneIndex = nodeArray.indexOf(event.target); // index of the stone chosen

  if (stoneIndex > 3) {
    // check blank stone above the stone chosen
    if (nodeArray[stoneIndex - 4].dataset.nom === "0") {
      event.target.style.transform = "translateY(-100%)";
      return;
    }
  }

  if (stoneIndex < 12) {
    // check blank stone beneath the stone chosen
    if (nodeArray[stoneIndex + 4].dataset.nom === "0") {
      event.target.style.transform = "translateY(100%)";
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
      return;
    }
  }
}

// Add click listener to the button for restart
button.addEventListener("click", shuffleStones);

// Add a click listener to each stone

stoneTransition.addEventListener("click", processStones);

stoneTransition.addEventListener("transitionend", (event) => {
  const stonesIndex = document.querySelectorAll(".stone");
  const nodeArray = Array.from(stonesIndex);

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

  event.target.style.transform = "none";
  return;
});

function vinnerCheck() {}

// Fill game field with the stones

shuffleStones();
