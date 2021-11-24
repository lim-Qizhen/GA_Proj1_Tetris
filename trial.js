"use strict"

const horizontalStraightTetro = {
    cyan: [
      [13, 14, 15, 16],
      [5,15,25,35],
      [23,24,25,26],
      [4,14,24,34]
    ],
    nextDisplay: [0,1,2,3],
  };

const squareTetro = {
yellow: [
    [4, 5, 14, 15],
    [4,5,14,15,],
    [4,5,14,15,],
    [4,5,14,15,]
],
nextDisplay: [1,2,5,6]
};

// const allTetros = [squareTetro, horizontalStraightTetro];
// const rotation = 0;

// console.log(typeof Object.values(squareTetro)[0][0][0])

// console.log(Object.values(squareTetro)[0])
//       for (let i = 0; i < Object.values(squareTetro)[0].length; i++) {
//           for (let j = 0; j < Object.values(squareTetro)[0][0].length; j++){
//               Object.values(squareTetro)[0][i][j] += 10;
//           }
//       };
//       console.log(Object.values(squareTetro)[0])
let array = [];
console.log(array.length === 0)