"use client";

import { ErrorBoundary } from "@/components/common/error-boundary";
import { GridView } from "@/components/core/grid-view";
import { PatientForm } from "@/components/form";
import { useState } from "react";

export default function Home() {
  const [csvData, setCsvData] = useState<string[][]>([]);

  const handleDataChange = (data: any) => {
    const transformedData = data.map((row: any) => [
      row.age || "",
      row.gender || "",
      row.height || "",
      row.weight || "",
      row.bmi || "",
      row.high_bp || "",
      row.low_bp || "",
      row.rbs || "",
      row.fbs || "",
      row.waist || "",
      row.hip || "",
      row.hba1c || "",
    ]);
    setCsvData(transformedData);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <div className="w-[60%]">
          <ErrorBoundary>
            <GridView initialRows={1} initialCols={8} data={csvData} />
          </ErrorBoundary>
        </div>
        <div className="w-[40%]">
          <ErrorBoundary>
            <PatientForm onDataChange={handleDataChange} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
