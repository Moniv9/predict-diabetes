import * as tf from "@tensorflow/tfjs";

export async function predictPatient(newPatient: any, trainedModel: any) {
  //const model = await tf.loadLayersModel("./model.json");

  // Convert patient data to tensor
  const inputTensor = tf.tensor2d([newPatient]);

  // Predict
  const prediction = trainedModel.predict(inputTensor);
  const probabilities = prediction.dataSync();
  const result = prediction.argMax(1).dataSync()[0];

  const labels = ["Non-Diabetic", "Pre-Diabetic", "Diabetic"];

  const output: any[] = [];

  // Display prediction percentages for each class
  labels.forEach((label, index) => {
    const percentage = (probabilities[index] * 100).toFixed(2);
    output.push({ label, percentage });
  });

  return { output };
}
