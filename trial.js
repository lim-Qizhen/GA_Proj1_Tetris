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

const allTetros = [squareTetro, horizontalStraightTetro];
  
//   console.log(Object.values(horizontalStraightTetro)[1])
console.log(allTetros.filter((array) => Object.keys(array)[0] === "yellow")[0]["yellow"])
console.log(Object.values(squareTetro)[0])