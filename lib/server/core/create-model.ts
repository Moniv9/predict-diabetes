import * as tf from "@tensorflow/tfjs";

/**
 * Creates a sequential neural network model for predicting HbA1c values.
 * The model architecture is designed for regression on patient health data.
 *
 * @returns {tf.Sequential} A compiled TensorFlow.js sequential model
 */
export function createModel(): tf.Sequential {
  // Create a sequential model
  const model = tf.sequential();

  // Add layers to the model
  // Input layer with 11 features (age, gender, height, weight, bmi, high_bp, low_bp, rbs, fbs, waist, hip)
  model.add(
    tf.layers.dense({
      inputShape: [11],
      units: 64,
      activation: "relu",
      kernelInitializer: "heNormal",
    })
  );

  // Add dropout to prevent overfitting
  model.add(tf.layers.dropout({ rate: 0.2 }));

  // Hidden layer
  model.add(
    tf.layers.dense({
      units: 32,
      activation: "relu",
      kernelInitializer: "heNormal",
    })
  );

  // Add dropout to prevent overfitting
  model.add(tf.layers.dropout({ rate: 0.2 }));

  // Output layer (single unit for HbA1c prediction)
  model.add(
    tf.layers.dense({
      units: 1,
      activation: "linear", // Linear activation for regression
    })
  );

  // Compile the model with mean squared error loss and Adam optimizer
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: "meanSquaredError",
    metrics: ["mse"],
  });

  console.log("Model created and compiled");
  model.summary();

  return model;
}
