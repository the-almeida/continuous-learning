const obstacles_1 = [4, 6];
const obstacles_2 = [2, 9, 4];
const obstacles_3 = [];

const instructions_1 = "RRRJJRRR";
const instructions_2 = "RRRLJ";
const instructions_3 = "RRRJJRRRL";
const instructions_4 = "RRRLRJJRRR";
const instructions_5 = "RRRRRRRRRR";
const instructions_6 = "RRJJJJ";
const instructions_7 = "RLRRRJJRRLLJJJLRRRJJRRR";
const instructions_8 = "RRRJJRLJJJRRR";
const instructions_9 = "R";
const instructions_10 = "RJJJJR";
const instructions_11 = "RJJRRRJ";

function level(obstacles, instructions) {
  const exitPosition = 10;
  let currentPosition = 0;
  let prevMove = "R"; // Initialize previous move as 'R'

  for (let i = 0; i < instructions.length; i++) {
    if (obstacles.includes(currentPosition)) {
      // If the current position is an obstacle, return false
      return false;
    }

    if (instructions[i] === "L") {
      currentPosition--;
      prevMove = "L"; // Update previous move
    } else if (instructions[i] === "R") {
      currentPosition++;
      prevMove = "R"; // Update previous move
    } else if (instructions[i] === "J") {
      // Move two positions in the direction of the previous move
      currentPosition += prevMove === "L" ? -2 : 2;
    }

    if(currentPosition === exitPosition){
        return true
    }

    if (currentPosition < 0 || currentPosition > exitPosition) {
      // If the player goes outside the level boundaries, return false
      return false;
    }
  }

  return currentPosition === exitPosition;
}

console.log('1',level(obstacles_1, instructions_1));  // Output: true
console.log('2',level(obstacles_1, instructions_2));  // Output: false
console.log('3',level(obstacles_1, instructions_3));  // Output: true
console.log('4',level(obstacles_1, instructions_4));  // Output: true
console.log('5',level(obstacles_1, instructions_5));  // Output: false
console.log('6',level(obstacles_1, instructions_6));  // Output: false
console.log('7',level(obstacles_1, instructions_7));  // Output: true
console.log('8', level(obstacles_1, instructions_8)); // Output: false
console.log('9',level(obstacles_1, instructions_9));  // Output: false
console.log('10',level(obstacles_1, instructions_10)); // Output: true
console.log('11',level(obstacles_2, instructions_11)); // Output: true
console.log('12',level(obstacles_3, instructions_9));  // Output: false
