import { Inter } from "next/font/google";
import TaskOverview from "@/components/TaskComponents/TaskOverview";

export default function Home() {
  return (
    <main className="max-w-[1400px] min-h-screen mx-auto py-10 text-gray-700">

      <div>
        <TaskOverview />
      </div>
    </main>
  );
}
