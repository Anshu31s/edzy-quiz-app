"use client";

import { useMemo, useState } from "react";
import type { QuizPayload, QuizQuestion } from "@/lib/quiz.types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import QuizTimer from "./QuizTimer";

export default function QuizScreen({
  payload,
  questions,
  score,
  incorrectAttempts,
  setScore,
  setIncorrectAttempts,
  onFinish,
  onRestart,
}: {
  payload: QuizPayload;
  questions: QuizQuestion[];
  score: number;
  incorrectAttempts: number;
  setScore: (v: number) => void;
  setIncorrectAttempts: (v: number) => void;
  onFinish: () => void;
  onRestart: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [status, setStatus] = useState<"idle" | "wrong" | "correct">("idle");

  // ✅ SAFETY 1: if questions missing
  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-4 py-10">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold">No questions found</h2>
          <p className="mt-2 text-sm text-zinc-600">
            The quiz started, but questions were not loaded properly.
          </p>
          <Button className="mt-4 rounded-xl" onClick={onRestart}>
            Restart
          </Button>
        </div>
      </main>
    );
  }

  const currentQuestion = questions[currentIndex];

  // ✅ SAFETY 2: index out of range
  if (!currentQuestion) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-4 py-10">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold">Quiz Completed</h2>
          <p className="mt-2 text-sm text-zinc-600">
            You have reached the end.
          </p>
          <Button className="mt-4 rounded-xl" onClick={onFinish}>
            View Summary
          </Button>
        </div>
      </main>
    );
  }

  // ✅ ensure options array
  const options = Array.isArray(currentQuestion.options)
    ? currentQuestion.options
    : [];

  const progressValue = useMemo(() => {
    return Math.round((currentIndex / questions.length) * 100);
  }, [currentIndex, questions.length]);

  const correctOptionId = useMemo(() => {
    // ✅ find option with isCorrect = true
    return options.find((o) => o.isCorrect)?.optionId ?? null;
  }, [options]);

  const handlePick = (optionId: string | number) => {
    if (status === "correct") return;

    setSelectedId(optionId);

    const picked = options.find((o) => o.optionId === optionId);

    // ✅ correct logic
    const isCorrect =
      picked?.isCorrect === true ||
      (correctOptionId !== null && correctOptionId === optionId);

    if (!isCorrect) {
      setStatus("wrong");
      setIncorrectAttempts(incorrectAttempts + 1);
      return;
    }

    setStatus("correct");
    setScore(score + 1);

    // ✅ Move to next after delay
    setTimeout(() => {
      const nextIndex = currentIndex + 1;

      if (nextIndex >= questions.length) {
        onFinish();
        return;
      }

      setCurrentIndex(nextIndex);
      setSelectedId(null);
      setStatus("idle");
    }, 600);
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Quiz</h1>
          <p className="text-sm text-zinc-600">
            {payload.examSubjectName} • {payload.numberOfQuestions} questions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <QuizTimer questionIndex={currentIndex} />
          <Button variant="outline" className="rounded-xl" onClick={onRestart}>
            Restart
          </Button>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mb-3 flex items-center justify-between text-sm text-zinc-600">
        <span>
          Question{" "}
          <span className="font-medium text-zinc-900">
            {currentIndex + 1}
          </span>{" "}
          of{" "}
          <span className="font-medium text-zinc-900">{questions.length}</span>
        </span>

        <span className="font-medium text-zinc-900">{progressValue}%</span>
      </div>

      <Progress value={progressValue} />

      {/* QUESTION CARD */}
      <Card className="mt-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            {currentQuestion.questionText || "Untitled Question"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* OPTIONS */}
          {options.length === 0 ? (
            <div className="rounded-xl border bg-white p-4">
              <p className="text-sm text-red-600">
                No options found for this question.
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Fix your API mapping in <b>lib/quiz.api.ts</b> (options array is
                empty).
              </p>
            </div>
          ) : (
            options.map((opt) => {
              const isSelected = selectedId === opt.optionId;
              const isCorrect = opt.isCorrect === true;

              const showCorrect = status !== "idle" && isCorrect;
              const showWrong = status === "wrong" && isSelected && !isCorrect;

              return (
                <button
                  key={String(opt.optionId)}
                  onClick={() => handlePick(opt.optionId)}
                  className={[
                    "w-full rounded-xl border p-3 text-left text-sm transition",
                    showCorrect
                      ? "border-green-600 bg-green-50"
                      : showWrong
                      ? "border-red-600 bg-red-50"
                      : "border-zinc-200 bg-white hover:border-zinc-300",
                  ].join(" ")}
                >
                  {opt.optionText}
                </button>
              );
            })
          )}

          {/* FEEDBACK */}
          {status === "wrong" ? (
            <p className="pt-2 text-sm text-red-600">
              Incorrect ❌ Try again (must answer correctly to continue).
            </p>
          ) : null}

          {status === "correct" ? (
            <p className="pt-2 text-sm text-green-600">
              Correct ✅ moving next...
            </p>
          ) : null}

          {/* STATS */}
          <div className="pt-4 text-xs text-zinc-500">
            Score: <span className="font-medium text-zinc-900">{score}</span> •
            Incorrect attempts:{" "}
            <span className="font-medium text-zinc-900">
              {incorrectAttempts}
            </span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
