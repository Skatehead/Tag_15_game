const button = document.querySelector(".btn");
let stonesIndex = document.querySelectorAll(".stone");
const stonesArray = [];
let nodeArray = [];
let stoneInTransition = 100;
let direction;
const stoneTransition = document.querySelector(".gameField");

function shuffleStones() {
  const unshuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

  let shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  for (let i = 0; i < 16; i++) {
    stonesArray[i] = shuffled[i];
    stonesIndex[i].style.backgroundImage = "none";
    if (shuffled[i] !== 0) {
      stonesIndex[i].style.backgroundImage = `url(stone_${shuffled[i]}.png)`;
    }
  }
}

function swapNodes(node1, node2) {
  let dummy = document.createElement("span");
  node1.before(dummy);
  node2.before(node1);
  dummy.replaceWith(node2);
}

// Checks if there is a blank stone (item = 0) around stone chosen and put the stone there
function processStones(evt) {
  if (stoneInTransition !== 100) {
    return;
  }

  // when this function is used as an event handler: this === evt.currentTarget
  nodeArray = Array.from(stonesIndex);
  const stoneIndex = nodeArray.indexOf(this); // index of the stone chosen
  const stoneItem = stonesArray[stoneIndex]; // item of the stone chosen
  stoneInTransition = stoneIndex;

  if (stoneIndex > 3) {
    // check blank stone above the stone chosen
    if (stonesArray[stoneIndex - 4] === 0) {
      stonesArray[stoneIndex - 4] = stoneItem;
      stonesArray[stoneIndex] = 0;

      //refreshBoard();
      this.style.transform = "translateY(-150px)";
      direction = "up";
      return;
    }
  }

  if (stoneIndex < 12) {
    // check blank stone beneath the stone chosen
    if (stonesArray[stoneIndex + 4] === 0) {
      stonesArray[stoneIndex + 4] = stoneItem;
      stonesArray[stoneIndex] = 0;
      //refreshBoard();
      this.style.transform = "translateY(150px)";
      direction = "down";
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
    if (stonesArray[stoneIndex + 1] === 0) {
      stonesArray[stoneIndex + 1] = stoneItem;
      stonesArray[stoneIndex] = 0;
      //refreshBoard();
      this.style.transform = "translateX(150px)";
      direction = "right";
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
    if (stonesArray[stoneIndex - 1] === 0) {
      stonesArray[stoneIndex - 1] = stoneItem;
      stonesArray[stoneIndex] = 0;
      //refreshBoard();
      this.style.transform = "translateX(-150px)";
      direction = "left";
      return;
    }
  }
  stoneInTransition = 100;
}

// Add click listener to the button for restart
button.addEventListener("click", shuffleStones);

// Add a click listener to each stone

for (const index of stonesIndex) {
  index.addEventListener("click", processStones);
}

stoneTransition.addEventListener("transitionend", () => {
  switch (direction) {
    case "up":
      swapNodes(
        stonesIndex[stoneInTransition],
        stonesIndex[stoneInTransition - 4]
      );
      break;
    case "down":
      swapNodes(
        stonesIndex[stoneInTransition],
        stonesIndex[stoneInTransition + 4]
      );
      break;
    case "right":
      swapNodes(
        stonesIndex[stoneInTransition],
        stonesIndex[stoneInTransition + 1]
      );
      break;
    case "left":
      swapNodes(
        stonesIndex[stoneInTransition],
        stonesIndex[stoneInTransition - 1]
      );
  }

  stonesIndex[stoneInTransition].style.transform = "none";
  stonesIndex = document.querySelectorAll(".stone");
  stoneInTransition = 100;
  direction = undefined;
});

function vinnerCheck() {}

// Fill game field with the stones

shuffleStones();
