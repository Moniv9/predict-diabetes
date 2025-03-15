"use client";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { FileText, Menu, RotateCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center flex-none">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-700" />
            <span className="font-bold hidden sm:inline">
              Diabetes Prediction
            </span>
            <span className="font-bold sm:hidden">Diabetes Prediction</span>
          </Link>
        </div>

        <div className="flex-1" />

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReload}
            className="mr-2"
          >
            <RotateCw className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReload}
            className="mr-2"
          >
            <RotateCw className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 py-2 border-t bg-background">
          <div className="flex flex-col space-y-2 py-2"></div>
        </div>
      )}
    </header>
  );
}
