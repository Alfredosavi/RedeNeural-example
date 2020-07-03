function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x) {
  return x * (1 - x);
}

class RedeNeural {
  constructor(i_nodes, h_nodes, o_nodes) {
    this.i_nodes = i_nodes;
    this.h_nodes = h_nodes;
    this.o_nodes = o_nodes;

    this.bias_ih = new Matrix(this.h_nodes, 1);
    this.bias_ih.randomizeMatriz();

    this.bias_ho = new Matrix(this.o_nodes, 1);
    this.bias_ho.randomizeMatriz();

    this.weigths_ih = new Matrix(this.h_nodes, this.i_nodes);
    this.weigths_ih.randomizeMatriz();

    this.weigths_ho = new Matrix(this.o_nodes, this.h_nodes);
    this.weigths_ho.randomizeMatriz();

    this.learning_rate = 0.1; // 10%
  }

  treino(arr, target) {
    let input = Matrix.arrayToMatrix(arr);

    let hidden = Matrix.mult(this.weigths_ih, input);
    hidden = Matrix.add(hidden, this.bias_ih);

    hidden.map(sigmoid);

    let output = Matrix.mult(this.weigths_ho, hidden);
    output = Matrix.add(output, this.bias_ho);

    output.map(sigmoid);

    // BACKPROPAGATION
    let expected = Matrix.arrayToMatrix(target);
    let output_error = Matrix.sub(expected, output);
    let d_output = Matrix.map(output, dsigmoid);
    let hidden_T = Matrix.transpose(hidden);

    let gradient = Matrix.hadamard(d_output, output_error);
    gradient = Matrix.escalar_mult(gradient, this.learning_rate);

    this.bias_ho = Matrix.add(this.bias_ho, gradient);

    let weigths_ho_deltas = Matrix.mult(gradient, hidden_T);
    this.weigths_ho = Matrix.add(this.weigths_ho, weigths_ho_deltas);

    let weigths_ho_T = Matrix.transpose(this.weigths_ho);
    let hidden_error = Matrix.mult(weigths_ho_T, output_error);
    let d_hidden = Matrix.map(hidden, dsigmoid);
    let input_T = Matrix.transpose(input);

    let gradient_H = Matrix.hadamard(d_hidden, hidden_error);
    gradient_H = Matrix.escalar_mult(gradient_H, this.learning_rate);

    this.bias_ih = Matrix.add(this.bias_ih, gradient_H);

    let weigths_ih_deltas = Matrix.mult(gradient_H, input_T);
    this.weigths_ih = Matrix.add(this.weigths_ih, weigths_ih_deltas);
  }

  predict(arr) {
    let input = Matrix.arrayToMatrix(arr);

    let hidden = Matrix.mult(this.weigths_ih, input);
    hidden = Matrix.add(hidden, this.bias_ih);

    hidden.map(sigmoid);

    let output = Matrix.mult(this.weigths_ho, hidden);
    output = Matrix.add(output, this.bias_ho);

    output.map(sigmoid);

    output = Matrix.MatrixToArray(output);
    return output;
  }
}
