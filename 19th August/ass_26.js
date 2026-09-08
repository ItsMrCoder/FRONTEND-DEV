let scores = [45, 78, 92, 67, 88, 55, 99];

let total = 0;
let highest = scores[0];
let lowest = scores[0];
let passed = 0;

for (let score of scores) {
    total += score;

    if (score > highest) {
        highest = score;
    }

    if (score < lowest) {
        lowest = score;
    }

    if (score >= 60) {
        passed++;
    }
}

let average = total / scores.length;

console.log("Highest score:", highest);
console.log("Lowest score:", lowest);
console.log("Total score:", total);
console.log("Average score:", average);
console.log("Number of people that passed:", passed);