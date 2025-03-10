import * as tf from "@tensorflow/tfjs";

export async function trainModel({ trainingData, model }: any) {
  const { X, Y } = trainingData;

  // Convert to tensors
  const xs = tf.tensor2d(X);
  const ys = tf.tensor1d(Y, "float32");

  console.log("Training the model...");

  await model.fit(xs, ys, {
    epochs: 50,
    batchSize: 10,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch: number, logs: any) => {
        console.log(
          `Epoch ${epoch + 1}: Loss = ${logs.loss}, Accuracy = ${logs.acc}`
        );
      },
    },
  });
}
