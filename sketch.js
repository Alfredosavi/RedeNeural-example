var train = true;

function setup() {
  createCanvas(250, 250);
  background(0);

  rn = new RedeNeural(2, 3, 1);

  // Problem XOR
  dataset = {
    inputs: [
      [1, 1],
      [1, 0],
      [0, 1],
      [0, 0],
    ],
    outputs: [[0], [1], [1], [0]],
  };
}

function draw() {
  if (train) {
    for (var i = 0; i < 10000; i++) {
      var index = floor(random(4));
      rn.treino(dataset.inputs[index], dataset.outputs[index]);
    }

    if (rn.predict([0, 0])[0] < 0.04 && rn.predict([1, 0])[0] > 0.98) {
      train = false;
      console.log("Finish");

      console.log("[0,0]:");
      console.log(rn.predict([0, 0]));

      console.log("[0,1]:");
      console.log(rn.predict([0, 1]));

      console.log("[1,0]:");
      console.log(rn.predict([1, 0]));

      console.log("[1,1]:");
      console.log(rn.predict([1, 1]));
    }
  }
}
