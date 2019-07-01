/* Reverse sort of number-array. Returns new array. */
function reverseSort(array) {
    return array.slice(0).sort(function (e1, e2) {
        return e2 - e1;
    });
}

/* Returns first n elements of specified array. Returns new array. */
function getFirst(array, n) {
    return array.slice(0, n);
}

/* Returns last n elements of specified array. Returns new array. */
function getLast(array, n) {
    return array.slice(-n);
}

/* Checks if the specified number is an even. */
function isEvenNumber(number) {
    return number % 2 === 0;
}

/* Gets sum of every element in specified array. Returns number. */
function getSum(array) {
    return array.filter(isEvenNumber).reduce(function (currSum, currValue) {
        return currSum + currValue;
    }, 0);
}

/* Generate array from 1 to N. */
function generateArray(n) {
    var tmpArray = [];
    for (var i = 1; i <= n; i++) {
        tmpArray.push(i);
    }
    return tmpArray;
}

/* Creates array of squares of even elements of the specified array. */
function getSquaresOfEvens(array) {
    return array.filter(isEvenNumber).map(function (x) {
        return Math.pow(x, 2);
    });
}

var array = [15, 2, 5, 6, 1, 0, 8, 21, 3, 6, 20, 3, 9, 4];
console.log("Original array: " + array);
console.log("Reverse sorted: " + reverseSort(array));
console.log("First 5 elements: " + getFirst(array, 5));
console.log("Last 5 elements: " + getLast(array, 5));
console.log("Sum of even elements: " + getSum(array));
console.log("");

var array2 = generateArray(100);
console.log("Generated array: " + array2);
console.log("Squares of even elements: " + getSquaresOfEvens(array2));
