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

let nextTetro = allTetros[Math.floor(Math.random() * allTetros.length)];
let currentTetro = allTetros[Math.floor(Math.random() * allTetros.length)];

//game process (one round)
function oneBlock() {
  console.log("One block")
  blockAppear(); //includes checking
  //check if tile can fall and let tile fall
  const tileDrop = setInterval(stopDrop, 100)
  let stopDropping = Object.values(currentTetro)[0][0][3] >= 190 || checkBlockFall();

  //console.log(stopDropping);
  function stopDrop(){
    if (stopDropping){
      clearInterval(tileDrop);
      currentTetro = nextTetro;
      nextTetro = allTetros[Math.floor(Math.random() * allTetros.length)];
    } else{
      tileDropping()
      stopDropping = Object.values(currentTetro)[0][0][3] >= 190 || checkBlockFall();
      //console.log(stopDropping)
    }
  }
  showNextTetro(nextTetro)
}

for(let i = 1; i <= 2; i++){
  oneBlock();
}

function blockAppear() {
  const squaresToChange = Object.values(currentTetro);
  let indices = squaresToChange[0][0];
  //drawing
  if (checkBlockAppear()) {
    console.log("appeared!")
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
  const squaresToChange = Object.values(currentTetro);
  const indices = squaresToChange[0][0];
  if (
    indices.every((x) => gameBoardSquares[x].style.backgroundColor === "black")
  ) {
    return true;
  }
}

function tileDropping() {
    const squaresToChange = Object.values(currentTetro);
    const indices = squaresToChange[0][0];
    if(checkBlockFall()){
      return;
    } else{
        //remove current colouring
        for (const number of indices) {
            const toChange = gameBoardSquares[number];
            toChange.style.backgroundColor = "black";
        }
        //lower the current block
        for (let i = 0; i < indices.length; i++) {
            Object.values(currentTetro)[0][0][i] += 10;
        }
        //colour the new grids to represent falling
        for (const number of Object.values(currentTetro)[0][0]) {
            const toChange = gameBoardSquares[number];
            toChange.style.backgroundColor = Object.keys(currentTetro);
        }
      }
}

function checkBlockFall(){ //return true if can't fall
  const squaresToChange = Object.values(currentTetro);
  const indices = squaresToChange[0][0];
  const nextPosition = [];
  for (let i = 0; i<indices.length; i++){
      nextPosition.push(indices[i] + 10);
  }
  const newSpots = [];
  for (const number of nextPosition){
    if(indices.indexOf(number) === -1){
      newSpots.push(number);
    }
  }
  return newSpots.some((x) => gameBoardSquares[x].style.backgroundColor !== "black");//true if some not black
}

function showNextTetro(next) {
  const squaresToChange = Object.values(next);
  for (const number of squaresToChange[0][1]) {
    const toChange = nextBoardSquares[number];
    toChange.style.backgroundColor = Object.keys(next);
    toChange.style.border = "0.5px solid grey";
  }
}

// function resetNextTile(){
//     const resetNextBackground = document.querySelectorAll("next-board");
//     for(square of resetNextBackground){
//           square.style.backgroundColor = "white";
//       }
// }
    
// function blockFall() {
//   const squaresToChange = Object.values(currentTetro);
//   console.log("run");
//   let indices = squaresToChange[0][0];
//   if (indices[3] < 190) {
//     for (let i = indices.length - 1; i >= 0; i--) {
//       if (gameBoardSquares[indices[i] + 10].style.backgroundColor === "black") {
//         gameBoardSquares[indices[i]].style.backgroundColor = "black";
//         gameBoardSquares[indices[i] + 10].style.backgroundColor =
//           Object.keys(currentTetro);
//       } else {
//         for (const number of indices) {
//           gameBoardSquares[number].style.backgroundColor =
//             Object.keys(currentTetro);
//         }
//         currentTetro = nextTetro;
//       }
//     }
//     for (let i = 0; i <= indices.length - 1; i++) {
//       indices[i] += 10;
//     }
//     Object.values(currentTetro)[0][0] = indices;
//   }
// }