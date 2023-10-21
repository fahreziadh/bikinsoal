"use client";
import CardSoalPlaceHolder from "@/components/card-soal-placeholder";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const ListSoalPlaceholder = ({ state = "idle" }: ListSoalPlaceholderProps) => {
  return (
    <div className="mx-auto mt-4 flex gap-4 flex-col">
      <motion.div
        animate={{
          opacity: cn(state === "idle" && "50%", state === "loading" && "100%"),
        }}
        transition={{ delay: 0.1, ease: "easeInOut" }}
      >
        <CardSoalPlaceHolder state={state} />
      </motion.div>
      <motion.div
        animate={{
          y: "0px",
          opacity: cn(state === "idle" && "40%", state === "loading" && "100%"),
        }}
        transition={{ delay: 0.2, ease: "easeInOut" }}
      >
        <CardSoalPlaceHolder state={state}  />
      </motion.div>
      <motion.div
        animate={{
          y: "0px",
          opacity: cn(state === "idle" && "30%", state === "loading" && "100%"),
        }}
        transition={{ delay: 0.3, ease: "easeInOut" }}
      >
        <CardSoalPlaceHolder state={state} />
      </motion.div>
      <motion.div
        transition={{ delay: 0.4, ease: "easeInOut" }}
        animate={{
          opacity: cn(state === "idle" && "20%", state === "loading" && "100%"),
        }}
      >
        <CardSoalPlaceHolder state={state} />
      </motion.div>
    </div>
  );
};

interface ListSoalPlaceholderProps {
  state?: "idle" | "loading" | "error";
}
export default ListSoalPlaceholder;
