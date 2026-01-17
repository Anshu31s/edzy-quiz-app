"use client";

import { useState } from "react";
import type { QuizPayload, QuizQuestion } from "@/lib/quiz.types";

import QuizSetup from "@/components/quiz/QuizSetup";
import QuizScreen from "@/components/quiz/QuizScreen";
import QuizSummary from "@/components/quiz/QuizSummary";

export default function QuizPage() {
  const [payload, setPayload] = useState<QuizPayload | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const [score, setScore] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);

  const resetAll = () => {
    setPayload(null);
    setQuestions([]);
    setIsFinished(false);
    setScore(0);
    setIncorrectAttempts(0);
  };

  // ✅ SHOW SETUP UNTIL QUIZ STARTS
  if (!payload) {
    return (
      <QuizSetup
        onStart={(p, q) => {
          console.log("QUIZ START QUESTIONS:", q);
          setPayload(p);
          setQuestions(q);
        }}
      />
    );
  }

  // ✅ If started but questions empty -> show message
  if (payload && questions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-red-600">
          Quiz started but no questions loaded.
        </p>
        <button
          onClick={resetAll}
          className="mt-3 rounded-xl border px-4 py-2"
        >
          Restart
        </button>
      </div>
    );
  }

  // ✅ Summary
  if (isFinished) {
    return (
      <QuizSummary
        total={questions.length}
        score={score}
        incorrectAttempts={incorrectAttempts}
        onRestart={resetAll}
      />
    );
  }

  // ✅ Main quiz screen
  return (
    <QuizScreen
      payload={payload}
      questions={questions}
      score={score}
      incorrectAttempts={incorrectAttempts}
      setScore={setScore}
      setIncorrectAttempts={setIncorrectAttempts}
      onFinish={() => setIsFinished(true)}
      onRestart={resetAll}
    />
  );
}
