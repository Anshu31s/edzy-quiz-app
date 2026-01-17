import axios from "axios";
import type { QuizPayload, QuizQuestion } from "./quiz.types";

export async function fetchQuizDetails(payload: QuizPayload) {
  const res = await axios.post("/api/quiz", payload);

  const rawQuestions =
    res.data?.data?.questions ?? res.data?.questions ?? ([] as any[]);

  if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
    throw new Error("No questions received from API");
  }

  const normalized: QuizQuestion[] = rawQuestions.map((q: any, idx: number) => {
    const questionId = q.id ?? q._id ?? idx + 1;
    const questionText = q.text ?? q.questionText ?? "Untitled Question";

    const rawOptions = Array.isArray(q.optionOrdering) ? q.optionOrdering : [];

    // ✅ correct answer id (string)
    const correctFromApi = q.questionInfo?.option;
    const correctOptionId = correctFromApi
      ? String(correctFromApi?.id ?? correctFromApi?._id ?? correctFromApi)
      : null;

    const options = rawOptions.map((o: any, optIdx: number) => {
      const optionIdRaw = o.id ?? o._id ?? o.optionId ?? optIdx + 1;
      const optionId = String(optionIdRaw);

      const optionText = o.text ?? o.optionText ?? "Option";

      return {
        optionId, // ✅ store as string always
        optionText,
        isCorrect: correctOptionId ? optionId === correctOptionId : false,
      };
    });

    // ✅ DEBUG (only first question)
    if (idx === 0) {
      console.log("✅ correctOptionId:", correctOptionId);
      console.log("✅ options ids:", options.map((x: any) => x.optionId));
    }

    return {
      questionId,
      questionText,
      options,
    };
  });

  return normalized;
}
