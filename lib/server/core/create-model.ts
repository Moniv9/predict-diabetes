import * as tf from "@tensorflow/tfjs";

export function createModel() {
  const model = tf.sequential();

  // Input Layer (12 features)
  model.add(
    tf.layers.dense({
      inputShape: [12],
      units: 128,
      kernelRegularizer: tf.regularizers.l2({ l2: 0.001 }), // FIXED
    })
  );
  model.add(tf.layers.batchNormalization());
  model.add(tf.layers.activation({ activation: "swish" }));
  model.add(tf.layers.dropout({ rate: 0.5 }));

  // Residual Block 1
  model.add(
    tf.layers.dense({
      units: 64,
      kernelRegularizer: tf.regularizers.l2({ l2: 0.001 }), // FIXED
    })
  );
  model.add(tf.layers.batchNormalization());
  model.add(tf.layers.activation({ activation: "swish" }));
  model.add(tf.layers.dropout({ rate: 0.4 }));

  // Residual Block 2
  model.add(
    tf.layers.dense({
      units: 32,
      kernelRegularizer: tf.regularizers.l2({ l2: 0.001 }), // FIXED
    })
  );
  model.add(tf.layers.batchNormalization());
  model.add(tf.layers.activation({ activation: "swish" }));
  model.add(tf.layers.dropout({ rate: 0.3 }));

  // Residual Block 3
  model.add(
    tf.layers.dense({
      units: 16,
      kernelRegularizer: tf.regularizers.l2({ l2: 0.001 }), // FIXED
    })
  );
  model.add(tf.layers.batchNormalization());
  model.add(tf.layers.activation({ activation: "swish" }));
  model.add(tf.layers.dropout({ rate: 0.2 }));

  // Residual Block 4
  model.add(
    tf.layers.dense({
      units: 8,
      kernelRegularizer: tf.regularizers.l2({ l2: 0.001 }), // FIXED
    })
  );
  model.add(tf.layers.batchNormalization());
  model.add(tf.layers.activation({ activation: "swish" }));

  // Output Layer (3 classes: Non-Diabetic, Pre-Diabetic, Diabetic)
  model.add(
    tf.layers.dense({
      units: 3,
      activation: "softmax",
      kernelInitializer: "glorotUniform",
    })
  );

  // Compile the model with AMSGrad (better for small datasets)
  model.compile({
    // @ts-ignore
    optimizer: tf.train.adam(0.0002, 0.9, 0.999, 1e-8, true), // AMSGrad=True
    loss: "sparseCategoricalCrossentropy",
    metrics: ["accuracy"],
  });

  return model;
}
