"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  age: z.string().min(1, { message: "Age is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  height: z.string().min(1, { message: "Height is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  bmi: z.string().min(1, { message: "BMI is required" }),
  high_bp: z.string().min(1, { message: "High BP is required" }),
  low_bp: z.string().min(1, { message: "Low BP is required" }),
  rbs: z.string().min(1, { message: "Random blood sugar is required" }),
  fbs: z.string().min(1, { message: "Fasting blood sugar is required" }),
  waist: z.string().min(1, { message: "Waist measurement is required" }),
  hip: z.string().min(1, { message: "Hip measurement is required" }),
  hba1c: z.string().min(1, { message: "HbA1c is required" }),
});

type PredictionOutput = {
  label: string;
  percentage: string;
};

type Prediction = {
  output: PredictionOutput[];
};

export function PatientForm({
  onDataChange,
}: {
  onDataChange: (data: string[][]) => void;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      gender: "",
      height: "",
      weight: "",
      bmi: "",
      high_bp: "",
      low_bp: "",
      rbs: "",
      fbs: "",
      waist: "",
      hip: "",
      hba1c: "",
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!file) {
      alert("Please upload a training data CSV file");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Convert form values to comma-separated string for prediction
      const patientData = [
        values.age,
        values.gender,
        values.height,
        values.weight,
        values.bmi,
        values.high_bp,
        values.low_bp,
        values.rbs,
        values.fbs,
        values.waist,
        values.hip,
        values.hba1c,
      ].join(",");

      formData.append("patientData", patientData);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      onDataChange(result.csvData);

      if (result.prediction !== undefined) {
        console.log("Prediction result:", result.prediction);
        setPrediction(result.prediction);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Upload Training Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-1.5">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors hover:border-primary/50">
              <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                {fileName || "Drag and drop or click to upload"}
              </p>
              <Input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
                className="mt-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Select CSV File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none">
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender (0-Female, 1-Male)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="1"
                          placeholder="0 or 1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Height" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Weight" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bmi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BMI</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="BMI"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="high_bp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>High BP (mmHg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="High BP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="low_bp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Low BP (mmHg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Low BP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rbs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Random Blood Sugar</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="RBS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fbs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fasting Blood Sugar</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="FBS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="waist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waist (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Waist" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hip (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Hip" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hba1c"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HbA1c</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="HbA1c"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  "Predict"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {prediction && (
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {prediction.output.map((item, index) => {
                    // Calculate the starting position for each segment
                    const previousSegments = prediction.output
                      .slice(0, index)
                      .reduce(
                        (acc, curr) => acc + parseFloat(curr.percentage),
                        0
                      );

                    const startAngle = (previousSegments / 100) * 360;
                    const angle = (parseFloat(item.percentage) / 100) * 360;
                    const endAngle = startAngle + angle;

                    // Convert angles to radians for calculations
                    const startRad = (startAngle - 90) * (Math.PI / 180);
                    const endRad = (endAngle - 90) * (Math.PI / 180);

                    // Calculate the coordinates
                    const x1 = 50 + 40 * Math.cos(startRad);
                    const y1 = 50 + 40 * Math.sin(startRad);
                    const x2 = 50 + 40 * Math.cos(endRad);
                    const y2 = 50 + 40 * Math.sin(endRad);

                    // Determine if the arc should be drawn as a large arc
                    const largeArcFlag = angle > 180 ? 1 : 0;

                    // Colors for different segments
                    const colors = ["#4CAF50", "#FFC107", "#F44336"];

                    return (
                      <path
                        key={index}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={colors[index % colors.length]}
                      />
                    );
                  })}
                </svg>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2 w-full">
                {prediction.output.map((item, index) => {
                  const colors = ["#4CAF50", "#FFC107", "#F44336"];
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 mr-2 rounded-sm"
                          style={{
                            backgroundColor: colors[index % colors.length],
                          }}
                        ></div>
                        <span>{item.label}</span>
                      </div>
                      <span className="font-bold">{item.percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
