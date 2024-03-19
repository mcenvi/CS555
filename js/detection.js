async function loadModel() {
  model = await tf.loadLayersModel("./tfjs-models/model.json");
  return model;
}

async function detect(imgToPredict) {
  // implement me!
}
