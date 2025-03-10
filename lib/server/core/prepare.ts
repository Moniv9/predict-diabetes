export async function prepareData(rawData: any[]) {
  const X = rawData.map((row: any) => [
    parseFloat(row.age),
    parseFloat(row.gender),
    parseFloat(row.height),
    parseFloat(row.weight),
    parseFloat(row.bmi),
    parseFloat(row.high_bp),
    parseFloat(row.low_bp),
    parseFloat(row.rbs), // random blood sugar
    parseFloat(row.fbs), // fasting blood sugar
    parseFloat(row.waist),
    parseFloat(row.hip),
    parseFloat(row.hba1c),
  ]);

  // Extract labels: 0 = Non-Diabetic, 1 = Pre-Diabetic, 2 = Diabetic
  const Y = rawData.map((row: any) => parseInt(row.label));

  return { X, Y };
}
