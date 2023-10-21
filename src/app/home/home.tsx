"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListSoalPlaceholder from "./ListSoalPlaceholder";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { api as apiClient } from "@/trpc/react";
import { ChevronRight } from "lucide-react";
import { useChat } from "ai/react";
/* 
  referensi prompt : tolong klasifikasikan text berikut : "woy, bikinin 3 soal dong matematika untuk anak kelas 5 sd".
berikan klasifikasi total soal yang ingin dibuat, mata pelajaran, untuk tingkat kelas berapa, serta topik nya apa , berikan jawaban dalam bentuk json {total,subject,grade,topic}, jika ada hal yang kosong, berikan jawaban null.
*/
export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat();

  return (
    <div className="container">
      <div className="mt-[60px] flex flex-col items-center justify-center">
        <Image src={"/logo.png"} width={150} height={150} alt="Logo" />
        <h1 className="text-2xl font-medium">Bikin Soal</h1>
        <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-[500px]  flex-col items-center gap-2 md:flex-row">
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
      {messages.length > 0
        ? messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))
        : null}
      <ListSoalPlaceholder state={isLoading && input ? "loading" : "idle"} />
    </div>
  );
}
