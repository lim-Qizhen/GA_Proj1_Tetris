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

let nextTetro = JSON.parse(JSON.stringify(verticalStraightTetro));
// let currentTetro = { ...squareTetro }; //this doesn't work ):
let currentTetro = JSON.parse(JSON.stringify(squareTetro));


let counter = 1;

function oneFallingBlock() {
  printTetro(); //includes checking
  printNextTetro();




  while (counter < 3){
    
    const tileDropTimer = setInterval(tetroFreeze, 500);
    function tetroFreeze() {
      if (tetroStop()) { 
        clearInterval(tileDropTimer);
        currentTetro = JSON.parse(JSON.stringify(nextTetro));
        nextTetro = JSON.parse(JSON.stringify(allTetros[Math.floor(Math.random()*allTetros.length)]));
        console.log("Block");
      } else { //move block down visually
        //uncolour
        Object.values(currentTetro)[0][0].forEach(
          (position) => (gameBoardSquares[position].style.backgroundColor = "black")
        );
        console.log(Object.values(currentTetro)[0][0])
        //lower tetro
        for (let i = 0; i < Object.values(currentTetro)[0][0].length; i++) {
          Object.values(currentTetro)[0][0][i] += 10;
        }
        console.log(Object.values(currentTetro)[0][0])
        //recolour
        Object.values(currentTetro)[0][0].forEach(
          (position) =>
            (gameBoardSquares[position].style.backgroundColor =
              Object.keys(currentTetro))
        );
        console.log(Object.values(currentTetro)[0][0])
      }
    }
    

    counter++
  }
}

oneFallingBlock()

function printTetro() {
  const positions = [...Object.values(currentTetro)[0][0]];
  console.log(positions)
  if (
    positions.some(
      (position) => gameBoardSquares[position].style.backgroundColor !== "black"
    )
  ) {
    console.log()
    console.log("the game is over");
    return;
  } else {
    console.log("okay!")
    positions.forEach(
      (position) =>
        (gameBoardSquares[position].style.backgroundColor =
          Object.keys(currentTetro))
    );
  }
}

// function tetroDrop() {
//   //uncolour
//   Object.values(currentTetro)[0][0].forEach(
//     (position) => (gameBoardSquares[position].style.backgroundColor = "black")
//   );
//   console.log(Object.values(currentTetro)[0][0])
//   //lower tetro
//   for (let i = 0; i < Object.values(currentTetro)[0][0].length; i++) {
//     Object.values(currentTetro)[0][0][i] += 10;
//   }
//   console.log(Object.values(currentTetro)[0][0])
//   //recolour
//   Object.values(currentTetro)[0][0].forEach(
//     (position) =>
//       (gameBoardSquares[position].style.backgroundColor =
//         Object.keys(currentTetro))
//   );
//   console.log(Object.values(currentTetro)[0][0])
// }

function tetroStop() {
  let positions = [...Object.values(currentTetro)[0][0]];
  //generating next drop zone to check
  const nextPositions = [];
  for (let i = 0; i < positions.length; i++) {
    nextPositions.push(positions[i] + 10);
  }
  console.log(positions);
  console.log(Object.values(currentTetro)[0][0])
  console.log(nextPositions);
  //finding new Spots
  const newSpots = [];
  for (const nextSpot of nextPositions) {
    if (positions.indexOf(nextSpot) === -1) {
      newSpots.push(nextSpot);
    }
  }
  console.log(newSpots);
  if (nextPositions[3] >= 200) {
    //reached the end (true indicates stop)
    return true;
  }
  console.log(
    newSpots.some((position) => gameBoardSquares[position].style.backgroundColor !== "black")
  );
  return newSpots.some((position) => gameBoardSquares[position].style.backgroundColor != "black"); //true indicates stop
}

function printNextTetro() {
  let positions = [...Object.values(currentTetro)[0][1]];
  positions.forEach(
    (position) =>
      (nextBoardSquares[position].style.backgroundColor =
        Object.keys(currentTetro))
  );
  positions.forEach(
    (position) => (nextBoardSquares[position].style.border = "0.5px solid grey")
  );
}

function moveLeft(){
}