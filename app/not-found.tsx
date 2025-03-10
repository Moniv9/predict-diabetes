"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-12">
          <div className="text-center space-y-8">
            {/* 404 Header */}
            <div className="space-y-2">
              <h1 className="text-8xl font-bold text-gray-900 dark:text-gray-100">
                404
              </h1>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                Page not found
              </h2>
            </div>

            {/* Illustration */}
            <div className="py-8">
              <div className="relative mx-auto w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Search className="w-16 h-16 text-gray-400 animate-pulse" />
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {`Sorry, we couldn't find the page you're looking for. It might have
              been moved, deleted, or never existed in the first place.`}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                variant="default"
                className="flex items-center gap-2"
                onClick={() => router.push("/home")}
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
