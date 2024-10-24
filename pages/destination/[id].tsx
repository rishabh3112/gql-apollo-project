import { Detail } from "@/components/detail";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";

export default function Destination() {
  const {
    query: { id },
  } = useRouter();
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col gap-4 p-4">
      <Header />
      <Detail id={id!.toString()} />
    </div>
  );
}
