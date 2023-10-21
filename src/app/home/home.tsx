"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListSoalPlaceholder from "./ListSoalPlaceholder";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useCompletion } from "ai/react";

export default function Home() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/ai",
    });

  return (
    <div className="container">
      <div className="mt-[60px] flex flex-col items-center justify-center">
        <Image src={"/logo.png"} width={150} height={150} alt="Logo" />
        <h1 className="text-2xl font-medium">Bikin Soal</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full max-w-[500px]  flex-col items-center gap-2 md:flex-row"
        >
          <Input
            onChange={handleInputChange}
            value={input}
            className="mx-auto"
            placeholder="4 Soal matematika, kelas 4 SMK, dengan topik 'Aljabar'"
          />
          <Button
            disabled={isLoading && input != ""}
            type="submit"
            className="w-[120px]"
          >
            {isLoading && input ? (
              "Loading..."
            ) : (
              <>
                Generate <ChevronRight className="ml-2" size={16} />
              </>
            )}
          </Button>
        </form>
      </div>
      {completion}
      <ListSoalPlaceholder state={isLoading && input ? "loading" : "idle"} />
    </div>
  );
}
