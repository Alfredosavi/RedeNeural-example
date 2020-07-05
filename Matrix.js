class Matrix {
  constructor(lin, col) {
    this.lin = lin;
    this.col = col;

    this.data = [];

    for (let i = 0; i < lin; i++) {
      let arr = [];
      for (let j = 0; j < col; j++) {
        arr.push(0);
      }
      this.data.push(arr);
    }
  }

  static arrayToMatrix(arr) {
    let matrix = new Matrix(arr.length, 1);

    matrix.map((elm, i, j) => {
      return arr[i];
    });
    return matrix;
  }

  static MatrixToArray(obj) {
    let array = [];

    obj.map((elm, i, j) => {
      return array.push(elm);
    });
    return array;
  }

  print() {
    console.table(this.data);
  }

  randomizeMatriz() {
    this.map((elm, i, j) => {
      return Math.random() * 2 - 1;
    });
  }

  static map(A, func) {
    let matrix = new Matrix(A.lin, A.col);

    matrix.data = A.data.map((arr, i) => {
      return arr.map((num, j) => {
        return func(num, i, j);
      });
    });
    return matrix;
  }

  map(func) {
    this.data = this.data.map((arr, i) => {
      return arr.map((num, j) => {
        return func(num, i, j);
      });
    });
    return this;
  }

  static transpose(A) {
    var matrix = new Matrix(A.col, A.lin);
    matrix.map((num, i, j) => {
      return A.data[j][i];
    });
    return matrix;
  }

  static hadamard(A, B) {
    var matrix = new Matrix(A.lin, A.col);

    matrix.map((num, i, j) => {
      return A.data[i][j] * B.data[i][j];
    });
    return matrix;
  }

  static add(A, B) {
    var matrix = new Matrix(A.lin, A.col);

    matrix.map((num, i, j) => {
      return A.data[i][j] + B.data[i][j];
    });
    return matrix;
  }

  static sub(A, B) {
    var matrix = new Matrix(A.lin, A.col);

    matrix.map((num, i, j) => {
      return A.data[i][j] - B.data[i][j];
    });
    return matrix;
  }

  static mult(A, B) {
    var matrix = new Matrix(A.lin, B.col);

    matrix.map((num, i, j) => {
      let sum = 0;
      for (let x = 0; x < A.col; x++) {
        let elem1 = A.data[i][x];
        let elem2 = B.data[x][j];
        sum += elem1 * elem2;
      }
      return sum;
    });
    return matrix;
  }

  static escalar_mult(A, escalar) {
    var matrix = new Matrix(A.lin, A.col);

    matrix.map((num, i, j) => {
      return A.data[i][j] * escalar;
    });
    return matrix;
  }
}
