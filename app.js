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
      square.style.fontSize = "10px";
      boardRow.append(square);
    }
    fullBoard.append(boardRow);
  }
  document.querySelector("#current-score").innerHTML = "0";
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
      boardRow.append(square);
    }
    nextBoard.append(boardRow);
  }
  document.querySelector("#current-score").innerHTML = "0";
}
nextTetroBoard();
const nextBoardSquares = document.querySelectorAll(".next-board-square");

//Tetrominoes
//square block
const squareTetro = {
  yellow: [
    [4, 5, 14, 15],
    [1, 2, 5, 6],
  ],
};
//vertical straight block
const verticalStraightTetro = {
  cyan: [
    [5, 15, 25, 35],
    [0, 4, 8, 12],
  ],
};
//horizontal sraight block
const horizontalStraightTetro = {
  cyan: [
    [3, 4, 5, 6],
    [0, 1, 2, 3],
  ],
};
const allTetros = [squareTetro, verticalStraightTetro, horizontalStraightTetro];

let nextTetro = { ...squareTetro };
// let currentTetro = { ...squareTetro };
// let currentTetro = Object.assign({}, squareTetro)
let keyss = Object.keys(squareTetro)[0];
let valuess = Object.values(squareTetro)[0];
let currentTetro={};
currentTetro[`${keyss}`] = [[`${valuess[0]}`,`${valuess[1]}`,`${valuess[2]}`,`${valuess[3]}`],[`${valuess[4]}`,5,6,7]]
console.log(currentTetro)
console.log(Object.values(currentTetro)[0][0])
console.log(Object.values(squareTetro)[0][0])

for (let i = 0; i < Object.values(currentTetro)[0][0].length; i++){
  Object.values(currentTetro)[0][0][i] ++
}

console.log(Object.values(currentTetro)[0][0])
console.log(Object.values(squareTetro)[0][0])

//game process (one round)
function oneBlock() {
  blockAppear(); //includes checking
  showNextTetro(nextTetro);
  //check if tile can fall and let tile fall
  const tileDrop = setInterval(stopDrop, 500);

  function stopDrop() {
    if (Object.values(currentTetro)[0][0][3] >= 190 || checkBlockFall()) {
      clearInterval(tileDrop);
      console.log(
        `before change: ${Object.values(currentTetro)}, ${Object.values(
          nextTetro
        )}`
      );
      currentTetro = { ...nextTetro };
      nextTetro = { ...horizontalStraightTetro };
      console.log(verticalStraightTetro, horizontalStraightTetro, squareTetro);
    } else {
      tileDropping();
    }
  }
}

for (let i = 1; i <= 1; i++) {
  oneBlock();
}

function blockAppear() {
  const squaresToChange = [...Object.values(currentTetro)];
  let indices = [...squaresToChange[0][0]];
  //drawing
  if (checkBlockAppear()) {
    console.log("appeared!");
    //checking if block has space to start
    for (const number of indices) {
      //getting indices of squares to change
      const toChange = gameBoardSquares[number];
      toChange.style.backgroundColor = Object.keys(currentTetro); //highlighting relevant divs
    }
  }
}

//checking if block has space to appear
function checkBlockAppear() {
  const squaresToChange = [...Object.values(currentTetro)];
  const indices = [...squaresToChange[0][0]];
  if (
    indices.every((x) => gameBoardSquares[x].style.backgroundColor === "black")
  ) {
    return true;
  }
}

function tileDropping() {
  const squaresToChange = [...Object.values(currentTetro)];
  const indices = [...squaresToChange[0][0]];
  //remove current colouring
  for (const number of indices) {
    const toChange = gameBoardSquares[number];
    toChange.style.backgroundColor = "black";
  }
  // console.log(Object.values(currentTetro)[0][0])
  console.log(Object.values(nextTetro)[0][0]);
  console.log(squareTetro.yellow[0]);
  //lower the current block
  for (let i = 0; i < Object.values(currentTetro)[0][0].length; i++) {
    Object.values(currentTetro)[0][0][i] += 10;
    console.log(Object.values(nextTetro)[0][0][i]);
  }
  console.log(Object.values(nextTetro)[0][0]);
  //colour the new grids to represent falling
  for (const place of Object.values(currentTetro)[0][0]) {
    gameBoardSquares[place].style.backgroundColor = Object.keys(currentTetro);
  }
}

function checkBlockFall() {
  //return true if can't fall
  const nextPosition = [];
  for (let i = 0; i < Object.values(currentTetro)[0][0].length; i++) {
    nextPosition.push(Object.values(currentTetro)[0][0][i] + 10);
  }
  console.log(`next position: ${nextPosition}`);
  console.log(`current Tetro: ${Object.values(currentTetro)[0][0]}`);
  const newSpots = [];
  for (const number of nextPosition) {
    if (Object.values(currentTetro)[0][0].indexOf(number) === -1) {
      newSpots.push(number);
    }
  }
  for (const position of newSpots) {
    if (position >= 200) {
      return true;
    }
  }
  return newSpots.some(
    (x) => gameBoardSquares[x].style.backgroundColor !== "black"
  ); //true if some not black
};

function showNextTetro(tetroToShow) {
  const squaresToChange = [...Object.values(tetroToShow)];
  for (const number of squaresToChange[0][1]) {
    const toChange = nextBoardSquares[number];
    toChange.style.backgroundColor = Object.keys(tetroToShow);
    toChange.style.border = "0.5px solid grey";
  }
}

// // function resetNextTile(){
// //     const resetNextBackground = document.querySelectorAll("next-board");
// //     for(square of resetNextBackground){
// //           square.style.backgroundColor = "white";
// //       }
// // }

// // function blockFall() {
// //   const squaresToChange = Object.values(currentTetro);
// //   console.log("run");
// //   let indices = squaresToChange[0][0];
// //   if (indices[3] < 190) {
// //     for (let i = indices.length - 1; i >= 0; i--) {
// //       if (gameBoardSquares[indices[i] + 10].style.backgroundColor === "black") {
// //         gameBoardSquares[indices[i]].style.backgroundColor = "black";
// //         gameBoardSquares[indices[i] + 10].style.backgroundColor =
// //           Object.keys(currentTetro);
// //       } else {
// //         for (const number of indices) {
// //           gameBoardSquares[number].style.backgroundColor =
// //             Object.keys(currentTetro);
// //         }
// //         currentTetro = nextTetro;
// //       }
// //     }
// //     for (let i = 0; i <= indices.length - 1; i++) {
// //       indices[i] += 10;
// //     }
// //     Object.values(currentTetro)[0][0] = indices;
// //   }
// // }
