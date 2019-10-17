module.exports = function solveSudoku(matrix) {
  let arrayWithZeros = [];

  // find all positions of zero
  function findZerosPosition() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] === 0) {
          arrayWithZeros.push([i, j]);
        }
      }
    }
  }

  function getArrayWithNumbers() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  function checkRow(row, guessNumber) {
    if (matrix[row].includes(guessNumber) === false) {
      return true;
    } else {
      return false;
    }
  }

  function checkColumn(column, guessNumber) {
    for (let i = 0; i < 9; i++) {
      if (matrix[i][column] === guessNumber) {
        return false;
      }
    }

    return true;
  }

  function checkSquare(row, column, guessNumber) {
    let cubeRow = Math.floor(row / 3) * 3;
    let cubeColumn = Math.floor(column / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matrix[cubeRow + i][cubeColumn + j] === guessNumber) {
          return false;
        }
      }
    }
    return true;
  }

  function checkCorrectSudoku(row, column, guessNumber) {
    if (
      checkRow(row, guessNumber) === false ||
      checkColumn(column, guessNumber) === false ||
      checkSquare(row, column, guessNumber) === false
    ) {
      return false;
    } else {
      return true;
    }
  }

  function trySolve() {
    // for -> how much zeros
    for (let i = 0; i < arrayWithZeros.length; i++) {
      // insert number one by one while all tests are ok, or just change number -> += 1
      for (let j = 1; j < 10; j++) {
        if (checkCorrectSudoku(arrayWithZeros[i][0], arrayWithZeros[i][1], j) === true) {
          matrix[arrayWithZeros[i][0]][arrayWithZeros[i][1]] = j;
          break;
        }
      }
    }
  }

  findZerosPosition();
  trySolve();
  findZerosPosition();
  trySolve();
  findZerosPosition();
  trySolve();
  findZerosPosition();
  trySolve();

  return matrix;
};
