"use strict"

let x = [1,2,3];
let y = [-1,-2,-3]
let z = [...x]

console.log(x.reduce((a,b) => (a+b)*10))
// console.log(sum)