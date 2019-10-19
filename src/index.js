module.exports = function solveSudoku(matrix) {
  let arrayWithZeros = [];
  let validNumbers = 9;

  // find all positions of zero
  function findZerosPosition(matrix) {
    arrayWithZeros = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] === 0) {
          arrayWithZeros.push([i, j]);
        }
      }
    }
  }

  findZerosPosition(matrix);

  function getArrayWithNumbers() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  function getStartingMatrix(matrix3) {
    return matrix3.map(el => el);
  }

  function checkRow(matrix, row, guessNumber) {
    if (matrix[row].includes(guessNumber) === false) {
      return true;
    } else {
      return false;
    }
  }

  function checkColumn(matrix, column, guessNumber) {
    for (let i = 0; i < 9; i++) {
      if (matrix[i][column] === guessNumber) {
        return false;
      }
    }
    return true;
  }

  function checkSquare(matrix, row, column, guessNumber) {
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

  function checkCorrectSudoku(matrix, row, column, guessNumber) {
    if (
      checkRow(matrix, row, guessNumber) === false ||
      checkColumn(matrix, column, guessNumber) === false ||
      checkSquare(matrix, row, column, guessNumber) === false
    ) {
      return false;
    } else {
      return true;
    }
  }

  function trySolve(matrix) {
    for (let i = 0; i < arrayWithZeros.length; ) {
      let row = arrayWithZeros[i][0];
      let column = arrayWithZeros[i][1];
      let guessNumber = matrix[row][column] + 1;
      let isSudokuSolved = false;

      for (; isSudokuSolved === false && guessNumber <= validNumbers; ) {
        if (checkCorrectSudoku(matrix, row, column, guessNumber)) {
          isSudokuSolved = true;
          matrix[row][column] = guessNumber;
          i += 1;
        } else {
          guessNumber += 1;
        }
      }

      if (isSudokuSolved === false) {
        matrix[row][column] = 0;
        i--;
      }
    }
    return matrix;
  }

  return trySolve(matrix);
};
