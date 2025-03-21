import { createModel } from "@/lib/server/core/create-model";
import { trainModel } from "@/lib/server/core/train-model";

class ModelSingleton {
  private static instance: any;

  private constructor() {}

  public static async getInstance({
    trainingData,
    resetTraining,
  }: {
    trainingData: any;
    resetTraining: boolean;
  }) {
    if (!ModelSingleton.instance) {
      ModelSingleton.instance = createModel();
    }

    if (resetTraining) {
      await trainModel({ trainingData, model: ModelSingleton.instance });
    }

    return ModelSingleton.instance;
  }
}

export const getModel = ModelSingleton.getInstance;
