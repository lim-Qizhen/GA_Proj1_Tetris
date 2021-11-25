"use strict";
//generate new game board
function newBoard() {
  const fullBoard = document.createElement("div");
  fullBoard.setAttribute("id", "board");
  // document.querySelector("#game-area").append(fullBoard);
  document.querySelector("#next-tile").before(fullBoard);
  //20 rows
  for (let i = 1; i <= 20; i++) {
    const boardRow = document.createElement("div");
    boardRow.className = "board-row";
    //10 columns
    for (let j = 1; j <= 10; j++) {
      const square = document.createElement("div");
      square.className = "board-square";
      square.style.width = "20px";
      square.style.height = "20px";
      square.style.border = "0.5px solid grey";
      square.style.backgroundColor = "black";
      square.innerText = `${(i - 1) * 10 + j - 1}`;
      square.setAttribute("id", `square-${(i - 1) * 10 + j - 1}`);
      square.style.fontSize = 0;
      boardRow.append(square);
    }
    fullBoard.append(boardRow);
  }
}
newBoard();
//collecting all squares of gameboard to change colour
const gameBoardSquares = document.querySelectorAll(".board-square");

//nextBoard
function nextTetroBoard() {
  const nextBoard = document.createElement("div");
  nextBoard.setAttribute("id", "next-board");
  // document.querySelector("#game-area").append(fullBoard);
  document.querySelector("#next-tile").append(nextBoard);
  //2 rows
  for (let i = 1; i <= 4; i++) {
    const boardRow = document.createElement("div");
    boardRow.className = "board-row";
    //4 columns
    for (let j = 1; j <= 4; j++) {
      const square = document.createElement("div");
      square.className = "next-board-square";
      square.style.width = "20px";
      square.style.height = "20px";
      //   square.style.border = "0.5px solid grey";
      square.style.backgroundColor = "white";
      //   square.innerText = `${(i - 1) * 10 + j - 1}`;
      square.style.fontSize = "10px";
      square.style.border = "0.5px solid white";
      boardRow.append(square);
    }
    nextBoard.append(boardRow);
  }
}
nextTetroBoard();
const nextBoardSquares = document.querySelectorAll(".next-board-square");
//Tetrominoes
//square block
const squareTetro = {
  yellow: [
    [4, 5, 14, 15],
    [4, 5, 14, 15],
    [4, 5, 14, 15],
    [4, 5, 14, 15],
  ],
  nextDisplay: [1, 2, 5, 6],
};

//sraight block
const straightTetro = {
  cyan: [
    [13, 14, 15, 16],
    [5, 15, 25, 35],
    [23, 24, 25, 26],
    [4, 14, 24, 34],
  ],
  nextDisplay: [0, 1, 2, 3],
};

//reverse L blue
const reverseLTetro = {
  deepskyblue: [
    [3, 13, 14, 15],
    [4, 5, 14, 24],
    [13, 14, 15, 25],
    [4, 14, 23, 24],
  ],
  nextDisplay: [0, 4, 5, 6],
};

//L block orange
const lTetro = {
  orange: [
    [5, 13, 14, 15],
    [4, 14, 24, 25],
    [13, 14, 15, 23],
    [3, 4, 14, 24],
  ],
  nextDisplay: [3, 5, 6, 7],
};

//t block purple
const tTetro = {
  plum: [
    [4, 13, 14, 15],
    [4, 14, 15, 24],
    [13, 14, 15, 24],
    [4, 13, 14, 24],
  ],
  nextDisplay: [1, 4, 5, 6],
};

//z block
const zTetro = {
  indianred: [
    [3, 4, 14, 15],
    [5, 14, 15, 24],
    [13, 14, 24, 25],
    [4, 13, 14, 23],
  ],
  nextDisplay: [0, 1, 5, 6],
};

//s block green
const sTetro = {
  palegreen: [
    [4, 5, 13, 14],
    [4, 14, 15, 25],
    [14, 15, 23, 24],
    [3, 13, 14, 24],
  ],
  nextDisplay: [1, 2, 4, 5],
};
const allTetros = [
  squareTetro,
  straightTetro,
  reverseLTetro,
  lTetro,
  tTetro,
  zTetro,
  sTetro,
];

//initiating game
let score = 0;
document.querySelector("#current-score").innerHTML = `${score}`;
let nextTetro = JSON.parse(
  JSON.stringify(allTetros[Math.floor(Math.random() * allTetros.length)])
);
let currentTetro = JSON.parse(
  JSON.stringify(allTetros[Math.floor(Math.random() * allTetros.length)])
);
let rotation = 0;
let timer = 1000;
let oldTimer = timer;
let lines = 0;
document.querySelector("#current-lines").innerHTML = `${lines}`;
let level = 0;
document.querySelector("#current-level").innerHTML = `${level}`;
//levels reached for lines cleared
const possibleLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const linesRequired = [10]; // element 1 is lines required to be level 1
for (let i = 1; i < possibleLevels.length; i++) {
  linesRequired.push(
    linesRequired[linesRequired.length - 1] + possibleLevels[i] * 10
  );
}

function oneFallingBlock() {
  //initiate the game starting
  printTetro(); //includes checking
  printNextTetro();
  showFurthest(findFurthestPosition());

  //game
  const tileDropTimer = setInterval(tetroFreeze, timer);
  function tetroFreeze() {
    if (tetroStop()) {
      clearInterval(tileDropTimer);
      currentTetro = JSON.parse(JSON.stringify(nextTetro));
      nextTetro = JSON.parse(
        JSON.stringify(allTetros[Math.floor(Math.random() * allTetros.length)])
      );
      resetNextTile();
      countScore();
      checkLevel();
      timer = 1000 - level * 65;
      oldTimer = timer;
      rotation = 0;
      oneFallingBlock();
    } else {
      tetroMoveDown();
    }
  }
}

function printTetro() {
  const positions = [...Object.values(currentTetro)[0][rotation % 4]];
  if (
    positions.some(
      (position) => gameBoardSquares[position].style.backgroundColor !== "black"
    )
  ) {
    window.alert("Game over. \nRESTART GAME.");
    location.reload(); //refreshes the html and resets variables
    return;
  } else {
    positions.forEach(
      (position) =>
        (gameBoardSquares[position].style.backgroundColor =
          Object.keys(currentTetro)[0])
    );
  }
}

function tetroStop() {
  let positions = [...Object.values(currentTetro)[0][rotation % 4]];
  //generating next drop zone to check
  const nextPositions = [];
  for (let i = 0; i < positions.length; i++) {
    nextPositions.push(positions[i] + 10);
  }
  //finding new Spots
  const newSpots = [];
  for (const nextSpot of nextPositions) {
    if (positions.indexOf(nextSpot) === -1) {
      newSpots.push(nextSpot);
    }
  }
  if (nextPositions[3] >= 200) {
    //reached the end (true indicates stop)
    return true;
  }
  return newSpots.some(
    (position) => gameBoardSquares[position].style.backgroundColor != "black"
  ); //true indicates stop
}

function printNextTetro() {
  let positions = [...Object.values(nextTetro)[1]];
  positions.forEach(
    (position) =>
      (nextBoardSquares[position].style.backgroundColor =
        Object.keys(nextTetro)[0])
  );
  positions.forEach(
    (position) => (nextBoardSquares[position].style.border = "0.5px solid grey")
  );
}

function resetNextTile() {
  const resetNextBackground = document.querySelectorAll(".next-board-square");
  for (const grid of resetNextBackground) {
    grid.style.backgroundColor = "white";
    grid.style.border = "0.5px solid white";
  }
}

function tetroMoveDown(){
  Object.values(currentTetro)[0][rotation % 4].forEach(
        (position) =>
          (gameBoardSquares[position].style.backgroundColor = "black")
      );
      //lower tetro (all positions)
      for (let i = 0; i < Object.values(currentTetro)[0].length; i++) {
        for (let j = 0; j < Object.values(currentTetro)[0][i].length; j++) {
          Object.values(currentTetro)[0][i][j] += 10;
        }
      }
      //recolour
      Object.values(currentTetro)[0][rotation % 4].forEach(
        (position) =>
          (gameBoardSquares[position].style.backgroundColor =
            Object.keys(currentTetro)[0])
      );
}

function checkSidePositions(moveSpaces) {
  let currentPositions = [...Object.values(currentTetro)[0][rotation % 4]];
  //generating next drop zone to check
  const nextPositions = [];
  for (let i = 0; i < currentPositions.length; i++) {
    nextPositions.push(currentPositions[i] + moveSpaces);
  }
  //finding new Spots
  const newSpots = [];
  for (const nextSpot of nextPositions) {
    if (currentPositions.indexOf(nextSpot) === -1) {
      newSpots.push(nextSpot);
    }
  }

  for (let i = 0; i < newSpots.length; i++) {
    if (gameBoardSquares[newSpots[i]].style.backgroundColor !== "black") {
      return true;
    }
  }
}

function tetroMove(direction) {
  let positions = [...Object.values(currentTetro)[0][rotation % 4]]; //current position
  let shift = 0; //initiating shift (-1 or +1)
  if (direction === "left") {
    //checking if alr at end
    if (positions.some((position) => position % 10 === 0)) {
      //at left end cannot move alr
      return;
    } else {
      //check if can shift left
      shift = -1;
      if (checkSidePositions(shift)) {
        return;
      }
    }
  } else if (direction === "right") {
    if (positions.some((position) => position % 10 === 9)) {
      //at left end
      return;
    } else {
      shift = 1;
      if (checkSidePositions(shift)) {
        return;
      }
    }
  }

  //uncolour
  Object.values(currentTetro)[0][rotation % 4].forEach(
    (position) => (gameBoardSquares[position].style.backgroundColor = "black")
  );
  //move tetro
  for (let i = 0; i < Object.values(currentTetro)[0].length; i++) {
    for (let j = 0; j < Object.values(currentTetro)[0][i].length; j++) {
      Object.values(currentTetro)[0][i][j] += shift;
    }
  }
  //recolour
  showFurthest(findFurthestPosition());
  Object.values(currentTetro)[0][rotation % 4].forEach(
    (position) =>
      (gameBoardSquares[position].style.backgroundColor =
        Object.keys(currentTetro)[0])
  );
}

function countScore() {
  for (let i = 0; i <= 19; i++) {
    let counter = 0;
    for (let j = 0; j <= 9; j++) {
      if (gameBoardSquares[i * 10 + j].style.backgroundColor != "black") {
        counter++;
      }
    }
    if (counter === 10) {
      //row i is filled
      score += 10;
      document.querySelector("#current-score").innerHTML = `${score}`;
      lines++;
      document.querySelector("#current-lines").innerHTML = `${lines}`;
      //remove complete line
      for (let k = 0; k <= 9; k++) {
        gameBoardSquares[i * 10 + k].style.backgroundColor = "black";
      }
      //drop above lines
      for (let l = i * 10 - 1; l >= 0; l--) {
        if (gameBoardSquares[l].style.backgroundColor !== "black") {
          gameBoardSquares[l + 10].style.backgroundColor =
            gameBoardSquares[l].style.backgroundColor;
          gameBoardSquares[l].style.backgroundColor = "black";
        }
      }
    }
  }
}

function checkLevel() {
  for (let i = linesRequired.length - 1; i >= 0; i--) {
    if (lines >= linesRequired[i]) {
      level = possibleLevels[i];
      document.querySelector("#current-level").innerHTML = `${level}`;
      return;
    }
  }
}

function findFurthestPosition() {
  let currentPositions = [...Object.values(currentTetro)[0][rotation % 4]];
  let nextPossiblePosition = [];
  for (let i = 1; i <= 19; i++) {
    nextPossiblePosition = [];
    for (let j = 0; j < currentPositions.length; j++) {
      //generate new positions
      nextPossiblePosition.push(currentPositions[j] + 10);
    }
    let newSpots = [];
    for (let k = 0; k < nextPossiblePosition.length; k++) {
      if (currentPositions.indexOf(nextPossiblePosition[k]) === -1) {
        newSpots.push(nextPossiblePosition[k]);
      }
    }
    if (newSpots.every((position) => position < 200)) {
      if (
        newSpots.every(
          (position) =>
            gameBoardSquares[position].style.backgroundColor === "black"
        )
      ) {
        currentPositions = [...nextPossiblePosition];
      } else {
        return (nextPossiblePosition = [...currentPositions]);
      }
    } else {
      return (nextPossiblePosition = [...currentPositions]);
    }
  }
  return nextPossiblePosition;
}

function showFurthest(furthestPosition) {
  //reset border colours
  for (let i = 0; i <= 199; i++) {
    gameBoardSquares[i].style.border = "0.5px solid grey";
    gameBoardSquares[i].style.opacity = "1";
  }
  // furthestPosition.forEach(
  // (position) =>
  //   (gameBoardSquares[position].style.border = `0.5px solid ${Object.keys(currentTetro)[0]}`)
  //               (gameBoardSquares[position].style.backgroundColor = `${Object.keys(currentTetro)[0]}`)
  //           );
  furthestPosition.forEach(
    (position) =>
      (gameBoardSquares[position].style.border = `0.5px solid ${
        Object.keys(currentTetro)[0]
      }`)
  );
  furthestPosition.forEach(
    (position) => (gameBoardSquares[position].style.opacity = "0.8")
  );
  return;
}

function quickDrop(furthestPosition) {
  let positions = [...Object.values(currentTetro)[0][rotation % 4]];
  // reset current square colours
  for (const currentPosition of positions) {
    gameBoardSquares[currentPosition].style.backgroundColor = "black";
  }
  Object.values(currentTetro)[0][rotation % 4] = [...furthestPosition];
  for (const newPosition of Object.values(currentTetro)[0][rotation % 4]) {
    // console.log(newPosition)
    gameBoardSquares[newPosition].style.backgroundColor = `${
      Object.keys(currentTetro)[0]
    }`;
  }
  currentTetro = JSON.parse(JSON.stringify(nextTetro));
  nextTetro = JSON.parse(
    JSON.stringify(allTetros[Math.floor(Math.random() * allTetros.length)])
  );
  resetNextTile();
  countScore();
  checkLevel();
  timer = 1000 - level * 65;
  oldTimer = timer;
  rotation = 0;
  printTetro();
  resetNextTile();
  printNextTetro();
  showFurthest(findFurthestPosition());
  return;
}

function tetroRotate() {
  //gets all current positions
  let positions = [...Object.values(currentTetro)[0]];
  let rotatedPosition = [...positions[(rotation + 1) % 4]];
  //craft new spots taken
  let newSpots = [];
  for (let i = 0; i < positions[rotation % 4].length; i++) {
    if (positions[rotation % 4].indexOf(rotatedPosition[i]) === -1) {
      newSpots.push(rotatedPosition[i]);
    }
  }

  //checks
  if (newSpots.some((position) => position >= 200)) {
    return;
  } else if (
    newSpots.some(
      (position) => gameBoardSquares[position].style.backgroundColor !== "black"
    )
  ) {
    return;
  } else if (newSpots.length === 0) {
    return;
  } 

  //to prevent block breaking up
  let columnPosition = []
  for (let i = 0; i < Object.values(currentTetro)[0][(rotation+1) % 4].length; i++){
    columnPosition.push(rotatedPosition[i] % 10);
  }
  let checkIfBlockBreaks = [];
  for(let i = 0; i < columnPosition.length;i++){
    checkIfBlockBreaks.push(columnPosition[(i+1)%4]-columnPosition[(i)%4])
  }

  if(columnPosition.some((position) => position === 0)){ //block at left
    console.log(rotatedPosition)
    console.log(checkIfBlockBreaks)
    for (let move = 1; move <=2 ; move ++){
      if (checkIfBlockBreaks.some((difference) => difference > 3)){
        for (let i = 0; i <rotatedPosition.length; i++){
          rotatedPosition[i] ++
        }
        console.log(Object.values(currentTetro)[0][(rotation+1) % 4])
        console.log(rotatedPosition)
        columnPosition = []
        for (let i = 0; i < rotatedPosition.length; i++){
          columnPosition.push(rotatedPosition[i] % 10);
        }
        console.log(columnPosition)
        checkIfBlockBreaks = [];
        for(let i = 0; i < columnPosition.length;i++){
          checkIfBlockBreaks.push(columnPosition[(i+1)%4]-columnPosition[(i)%4])
        }
        console.log(checkIfBlockBreaks.some((difference) => difference > 3))
        console.log(checkIfBlockBreaks)
      } 
    }
  }
  
  //uncolour
  Object.values(currentTetro)[0][rotation % 4].forEach(
    (position) => (gameBoardSquares[position].style.backgroundColor = "black")
  );
  //rotate
  rotation++;
  console.log(rotatedPosition)
  Object.values(currentTetro)[0][rotation % 4] = [...rotatedPosition];
  //colour new
  Object.values(currentTetro)[0][rotation % 4].forEach(
    (position) =>
      (gameBoardSquares[position].style.backgroundColor =
        Object.keys(currentTetro)[0])
  );

  showFurthest(findFurthestPosition());
}

//event Listeners

//keyboard controls
document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "ArrowLeft": //left arrow
      tetroMove("left");
      break;
    case "ArrowRight": //right arrow
      tetroMove("right");
      break;
    case "ArrowDown": //down arrow
      timer = 50;
      if (!tetroStop()){
        tetroMoveDown();
      }
      timer = oldTimer;
      break;
    case "ArrowUp":
      tetroRotate();
      break;
    case "Space": //space bar
      e.preventDefault();
      quickDrop(findFurthestPosition());
      break;
  }
});

document
  .querySelector("#start-button")
  .addEventListener("click", oneFallingBlock);
