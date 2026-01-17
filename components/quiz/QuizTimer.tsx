"use client";

import { useEffect, useRef, useState } from "react";

export default function QuizTimer({ questionIndex }: { questionIndex: number }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSeconds(0);
  }, [questionIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="text-xs text-zinc-600">
      Time: <span className="font-medium text-zinc-900">{seconds}s</span>
    </div>
  );
}
