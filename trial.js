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

// console.log(parseColor('red'))
const a = [10,1,9,-20]
const b = [10,1,9,-20]
console.log(JSON.stringify(a) !== JSON.stringify(b))