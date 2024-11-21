"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AI_PROMPT, FoodBank, IndoorOut, IngredientOptions } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AiModal";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface FormData {
  ingredient?: string;
  ingredient2?: string;
}

function CreateRecipe() {
  const [formData, setFormData] = useState<FormData>({});
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
 
  useEffect(() => {
    fetchExcelData();
  }, []);

  const fetchExcelData = async () => {
    try {
      const response = await fetch("/api/excel-data");
      const data = await response.json();
      setExcelData(data.data);
    } catch (error) {
      console.error("Error fetching Excel data:", error);
      toast("Failed to fetch Excel data.");
    }
  };

  const handleIngredientChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      ingredient: value,
      ingredient2: value,
    }));
  };

  const OnGenerateRecipe = async () => {
    if (formData?.ingredient == null) {
      toast("Please choose an ingredient");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{ingredient}",
      formData.ingredient ?? ""
    ).replace("{ingredient2}", formData.ingredient2 ?? "");

    setIsLoading(true);
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response.text();
      setAiResponse(responseText);
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:max-w-md md:mx-auto">
      <header className="flex justify-between items-center mb-12">
        <Link href={"/"}>
        <Button variant="ghost" size="icon" className="rounded-full">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
          <span className="sr-only">Back</span>
        </Button>
        </Link>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="h-6 w-6 text-gray-600" />
          <span className="sr-only">More options</span>
        </Button>
      </header>

      <main className="space-y-3 mb-6">
        <h1 className="text-4xl font-semibold text-gray-500 text-center mb-8">
          PlateMate
        </h1>

        <Card className="bg-gray-50 border-0 shadow-none">
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            Generate recipes based on what you input
            <br />
            e.g (Make a recipe using rice, potatoes, and apples)
          </div>
        </Card>

        <Card className="bg-gray-50 border-0 shadow-none">
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            Allows user to provide
            <br />
            follow-up corrections With Ai
          </div>
        </Card>
      </main>

      <div className="space-y-4">
        <Select onValueChange={handleIngredientChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an ingredient..." />
          </SelectTrigger>
          <SelectContent>
          <SelectGroup>
          <SelectLabel>Hyrdroponics</SelectLabel>
            {IngredientOptions.map((item, index) => (
              <SelectItem key={index} value={item.title}>
                {item.title}
              </SelectItem>
            ))}
            </SelectGroup>
            <SelectGroup>
          <SelectLabel>Indoor-Outdoor Garden</SelectLabel>
            {IndoorOut.map((item, index) => (
              <SelectItem key={index} value={item.title}>
                {item.title}
              </SelectItem>
            ))}
            </SelectGroup>
            <SelectGroup>
          <SelectLabel>Food Bank</SelectLabel>
            {FoodBank.map((item, index) => (
              <SelectItem key={index} value={item.title}>
                {item.title}
              </SelectItem>
            ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={OnGenerateRecipe}
          className="w-full bg-[#388E3C] hover:bg-[#29642c] text-white"
        >
          Generate Recipe
        </Button>
      </div>

      {isLoading ? (
        <div className="mt-8 w-full max-w-md">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      ) : aiResponse ? (
        <div className="mt-8 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Generated Recipe:</h3>
          <div className="prose prose-sm">
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          </div>
        </div>
      ) : null}

     {/*<TestingData />*/}
    </div>
  );
}

export default CreateRecipe;
