# Multi-class-imagined-speech-classification-web-demo

BCI multi-class imagined speech classification demo, by tensorflow.js

## Instruction

Deep learning models can be run in the browser with the help of the TensorFlow.js library. First, you need to use `tensorflowjs_converter` to convert tensorflow's `graph model` or keras' `layer model` to a model supported by TensorFlow.js.
The tool can be installed via `pip install tensorflowjs`.

If you use Keras model conversion, the operation is as follows:

```
tensorflowjs_convert --input_format keras --output_format tfjs_layers_model   /path/to/keras/hdf5/model  /path/to/output/folder
```

The model will generate a `model.json` file and one or more `bin` files, where the former saves the topology of the model and the latter saves the weights of the model.
To use JavaScript, you need to introduce the `tfjs.min.js` library into html first, and then load the model

```
<script src="js/tfjs.min.js"></script>

```

In `detection.js`, load the model:

```
model = await tf.loadLayersModel('./tfjs-models/model.json');
```

## Running

Open the terminal in the current directory and you only need to create a minimal web server.
For those using python

```
// python3
python -m http.server
// python2
python -m SimpleHTTPServer

```

If you use Node.js

```
npm install serve -g //install serve
serve // this will open a mini web serve
// you can also use http-serve
npm install http-server -g
http-server
```

## Output

You can click the upload image button on the web page, or drag the image to the web page area, and then the model will automatically output desired results.

![output](https://github.com/mcenvi/CS555/blob/main/web_application/images/result.png)