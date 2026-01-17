"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { QuizPayload, QuizQuestion, QuizSubject } from "@/lib/quiz.types";
import { fetchQuizDetails } from "@/lib/quiz.api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SUBJECTS: QuizSubject[] = [
  "Class 10 - English",
  "Class 10 - Mathematics",
  "Class 10 - Science",
  "Class 10 - Social Science",
];

const COUNTS: Array<5 | 10 | 15> = [5, 10, 15];

export default function QuizSetup({
  onStart,
}: {
  onStart: (payload: QuizPayload, questions: QuizQuestion[]) => void;
}) {
  const [subject, setSubject] = useState<QuizSubject>("Class 10 - English");
  const [count, setCount] = useState<5 | 10 | 15>(5);

  const payload = useMemo<QuizPayload>(
    () => ({
      examSubjectName: subject,
      numberOfQuestions: count,
    }),
    [subject, count]
  );

  const quizQuery = useQuery({
    queryKey: ["quiz", payload.examSubjectName, payload.numberOfQuestions],
    queryFn: () => fetchQuizDetails(payload),
    enabled: false,
    retry: 1,
  });

  const handleStart = async () => {
    const res = await quizQuery.refetch();
    if (res.data) onStart(payload, res.data);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-10">
      <Card className="w-full rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Start Quiz</CardTitle>
          <p className="text-sm text-zinc-600">
            Choose subject and number of questions.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">Select Subject</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  className={`rounded-xl border p-3 text-left text-sm transition ${
                    subject === s
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Number of Questions</p>
            <div className="flex flex-wrap gap-3">
              {COUNTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  className={`rounded-xl border px-4 py-2 text-sm transition ${
                    count === c
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {quizQuery.isError ? (
            <p className="text-sm text-red-600">
              Failed to fetch quiz. Please try again.
            </p>
          ) : null}

          <Button
            className="w-full rounded-xl"
            onClick={handleStart}
            disabled={quizQuery.isFetching}
          >
            {quizQuery.isFetching ? "Loading..." : "Start Quiz"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
