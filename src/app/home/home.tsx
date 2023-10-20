"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListSoalPlaceholder from "./ListSoalPlaceholder";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/trpc/react";

export default function Home() {
  const [text, setText] = useState("");
  const { data, isLoading } = api.post.hello.useQuery(
    { text: text },
    { enabled: text !== "" },
  );

  const generate = () => {
    setText("4 Soal matematika, kelas 4 SMK, dengan topik 'Aljabar'");
  };

  return (
    <div className="container">
      <div className="mt-[60px] flex flex-col items-center justify-center">
        <Image src={"/logo.png"} width={150} height={150} alt="Logo" />
        <h1 className="text-2xl font-medium">Bikin Soal</h1>
        <div className="mt-6 flex w-full max-w-[500px]  flex-col items-center gap-2 md:flex-row">
          <Input
            className="mx-auto"
            placeholder="4 Soal matematika, kelas 4 SMK, dengan topik 'Aljabar'"
          />
          <motion.div
            transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
            initial={{ width: "200px" }}
            animate={{ width: "120px" }}
          >
            <Button type="button" onClick={generate} className="w-full">
              Generate
            </Button>
          </motion.div>
        </div>
      </div>
      <ListSoalPlaceholder state={isLoading ? "loading" : "idle"} />
    </div>
  );
}
