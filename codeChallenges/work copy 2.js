const obstacles_1 = [4, 6];
const obstacles_2 = [2, 9, 4];
const obstacles_3 = [];

const instructions_1 = 'RRRJJRRR';
const instructions_2 = 'RRRLJ';
const instructions_3 = 'RRRJJRRRL';
const instructions_4 = 'RRRLRJJRRR';
const instructions_5 = 'RRRRRRRRRR';
const instructions_6 = 'RRJJJJ';
const instructions_7 = 'RLRRRJJRRLLJJJLRRRJJRRR';
const instructions_8 = 'RRRJJRLJJJRRR';
const instructions_9 = 'R';
const instructions_10 = 'RJJJJR';
const instructions_11 = 'RJJRRRJ';

function level(obstacles, instructions) {
    const exitPosition = 10;
    let currentPosition = 0;
  
    for (let i = 0; i < instructions.length; i++) {
      if (obstacles.includes(currentPosition)) {
        return false;
      }
  
      if (instructions[i] === 'L') {
        currentPosition--;
      } else if (instructions[i] === 'R') {
        currentPosition++;
      } else if (instructions[i] === 'J') {
        const prevMove = instructions[i - 1];
        currentPosition += prevMove === 'L' ? -2 : 2;
      }
  
      if (currentPosition < 0 || currentPosition > exitPosition) {
        return false;
      }
    }
    return currentPosition === exitPosition;
  }
  

console.log(level(obstacles_1, instructions_1));  // Output: true
console.log(level(obstacles_1, instructions_2));  // Output: false
console.log(level(obstacles_1, instructions_3));  // Output: true
console.log(level(obstacles_1, instructions_4));  // Output: true
console.log(level(obstacles_1, instructions_5));  // Output: false
console.log(level(obstacles_1, instructions_6));  // Output: false
console.log(level(obstacles_1, instructions_7));  // Output: true
console.log(level(obstacles_1, instructions_8));  // Output: false
console.log(level(obstacles_1, instructions_9));  // Output: false
console.log(level(obstacles_1, instructions_10)); // Output: true
console.log(level(obstacles_2, instructions_11)); // Output: true
console.log(level(obstacles_3, instructions_9));  // Output: false
