"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuizSummary({
  total,
  score,
  incorrectAttempts,
  onRestart,
}: {
  total: number;
  score: number;
  incorrectAttempts: number;
  onRestart: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-10">
      <Card className="w-full rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            Quiz Completed 🎉
          </CardTitle>
          <p className="text-sm text-zinc-600">
            Your score summary is shown below.
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-white p-4">
              <p className="text-sm text-zinc-600">Final Score</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {score} / {total}
              </p>
            </div>

            <div className="rounded-xl border bg-white p-4">
              <p className="text-sm text-zinc-600">Incorrect Attempts</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {incorrectAttempts}
              </p>
            </div>
          </div>

          <Button onClick={onRestart} className="w-full rounded-xl">
            Reattempt Quiz
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
