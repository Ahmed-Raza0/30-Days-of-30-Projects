"use client";

import { useState, ChangeEvent } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const hexToRGB = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

const defaultColors = [
  "#FFFFFF",
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
];

export default function ColorPicker() {
  const [color, setColor] = useState<string>(defaultColors[5]);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setColor(e.target.value);
    setCopySuccess(false);
  };

  const handleDefaultColor = (color: string): void => {
    setColor(color);
    setCopySuccess(false);
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(color);
    setCopySuccess(true);
  };

  const resetColor = (): void => {
    setColor(defaultColors[5]);
    setCopySuccess(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-auto p-8 grid gap-8">
        <div className="text-center space-y-2">
          <CardTitle>Color Picker</CardTitle>
          <CardDescription>
            Select a color and copy the hex and RGB values.
          </CardDescription>
        </div>

        <div className="grid gap-4">
          <div
            className={`w-full h-48 rounded-lg border-4 border-gray-200 dark:border-gray-800`}
            style={{ backgroundColor: color }}
            aria-label={`Selected color: ${color}`}
          />

          <div className="flex justify-center space-x-4">
            {defaultColors.map((defaultColor) => (
              <button
                key={defaultColor}
                className={`w-12 h-12 border border-gray-300 rounded-full`}
                style={{ backgroundColor: defaultColor }}
                onClick={() => handleDefaultColor(defaultColor)}
                aria-label={`Select color ${defaultColor}`}
              />
            ))}
          </div>

          <div className="grid gap-2 text-center">
            <div className="text-2xl font-semibold">{color}</div>
            <div className="text-gray-500 dark:text-gray-400">
              RGB: {hexToRGB(color)}
            </div>

            <Button
              onClick={copyToClipboard}
              variant="default"
              className="w-full"
            >
              {copySuccess ? "Copied!" : "Copy to Clipboard"}
            </Button>

            <Button
              onClick={resetColor}
              variant="outline"
              className="w-full mt-2"
            >
              Reset to Default
            </Button>
          </div>

          <Input
            name="color-picker"
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-full h-16 p-0 border-0 rounded-md cursor-pointer"
            aria-label="Color picker"
          />
        </div>
      </Card>
    </div>
  );
}
