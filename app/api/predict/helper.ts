import { createModel } from "@/lib/server/core/create-model";
import { trainModel } from "@/lib/server/core/train-model";

class ModelSingleton {
  private static instance: any;
  private static lastTrainingData: any;

  private constructor() {}

  public static async getInstance(trainingData: any) {
    if (!ModelSingleton.instance) {
      ModelSingleton.instance = createModel();
      ModelSingleton.lastTrainingData = trainingData;
      await trainModel({ trainingData, model: ModelSingleton.instance });
    }

    return ModelSingleton.instance;
  }
}

export const getModel = ModelSingleton.getInstance;
