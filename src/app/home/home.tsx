import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListSoalPlaceholder from "./ListSoalPlaceholder";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <div className="flex mt-[60px] flex-col items-center justify-center">
        <Image src={'/logo.png'} width={200} height={200} alt="Logo"/>
        <h1 className="text-2xl font-medium">Bikin Soal</h1>
        <div className="mt-6 flex flex-col md:flex-row  w-full items-center gap-2 max-w-[500px]">
          <Input className="mx-auto" placeholder="4 Soal matematika, kelas 4 SMK, dengan topik 'Aljabar'" />
          <Button className="w-[100px]">Generate</Button>
        </div>
      </div>
      <ListSoalPlaceholder />
    </div>
  );
}
