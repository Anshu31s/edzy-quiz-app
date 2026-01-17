import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4">
      <div className="w-full rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Edzy Quiz App</h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Select subject, pick question count, attempt quiz and get score summary.
        </p>

        <div className="mt-6">
          <Link href="/quiz">
            <Button className="rounded-xl">Start Quiz</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
