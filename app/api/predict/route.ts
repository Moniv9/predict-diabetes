import { createModel } from "@/lib/server/core/create-model";
import { parseCSV } from "@/lib/server/core/parser";
import { predictPatient } from "@/lib/server/core/predict";
import { prepareData } from "@/lib/server/core/prepare";
import { trainModel } from "@/lib/server/core/train-model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const patientData = formData.get("patientData") as string;

    if (!file || !patientData) {
      return NextResponse.json(
        { error: "Missing file or patient data" },
        { status: 400 }
      );
    }

    const csvData = await parseCSV(file);

    const trainingData = await prepareData(csvData);
    const model = createModel();
    // @ts-ignore
    await trainModel({ trainingData, model });

    const inputData = patientData.split(",").map(Number);
    const prediction = await predictPatient(
      inputData,
      model,
      trainingData.stats
    );

    return NextResponse.json({
      csvData,
      prediction,
    });
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      { error: "Failed to process prediction", errorData: error },
      { status: 500 }
    );
  }
}
