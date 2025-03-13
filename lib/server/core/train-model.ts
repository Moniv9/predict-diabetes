import * as tf from "@tensorflow/tfjs";

interface TrainingParams {
  trainingData: {
    X: tf.Tensor2D;
    Y: tf.Tensor1D;
    stats: {
      mean: tf.Tensor1D;
      std: tf.Tensor1D;
    };
  };
  model: tf.Sequential;
  epochs?: number;
  batchSize?: number;
  validationSplit?: number;
}

export async function trainModel({
  trainingData,
  model,
  epochs = 100,
  batchSize = 32,
  validationSplit = 0.2,
}: TrainingParams): Promise<tf.History> {
  console.log("Starting model training...");

  // Train the model
  const history = await model.fit(trainingData.X, trainingData.Y, {
    epochs,
    batchSize,
    validationSplit,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(logs);
        console.log(
          `Epoch ${epoch + 1}/${epochs}: loss = ${logs?.loss.toFixed(
            4
          )}, val_loss = ${logs?.val_loss.toFixed(4)}`
        );
      },
    },
  });

  console.log("Model training completed");

  // Evaluate the model on the training data
  const evaluation = model.evaluate(
    trainingData.X,
    trainingData.Y
  ) as tf.Scalar[];
  console.log(`Final MSE: ${evaluation[0].dataSync()[0].toFixed(4)}`);

  return history;
}
