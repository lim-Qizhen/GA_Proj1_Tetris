"use strict"

const a=[1,2,3];
const b=[2,3,4];
const newElements = [];
for (const number of b){
    if (a.indexOf(number) === -1)[
        newElements.push(number)
    ]
}

console.log(a.some((x) => x > 6))