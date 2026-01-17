# Edzy Frontend Hackathon — Task 3 (Quiz App)

This project is built for **Edzy Frontend Hackathon - Task 3**.

A Quiz App where users can:
- Select a subject
- Select number of questions (5 / 10 / 15)
- Attempt quiz **one question at a time**
- Get immediate correct/incorrect feedback
- Retry until correct
- Track score + incorrect attempts
- View summary & restart quiz
- Bonus: per-question timer reset

---

## 🚀 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **TanStack Query (React Query)**
- **Next.js API Routes** (proxy)

---

## ✅ Features

### Quiz Setup
- Select subject (Class 10 - English, Maths, Science, Social Science)
- Select number of questions (5 / 10 / 15)

### Quiz Flow
- Questions fetched from API (no hardcoding)
- One question shown at a time
- Progress indicator + progress bar
- Immediate feedback:
  - Wrong option highlights red
  - Correct option highlights green
- User must retry until correct to move forward

### Score Summary
- Final Score (correct answers)
- Incorrect attempts count
- Restart button to reattempt quiz

### Bonus
- Per-question timer (resets when question changes)

---

## 🔗 API Integration (Using Next API Route)

Frontend does NOT call external API directly.

✅ Frontend calls:
POST /api/quiz


✅ Next.js API Route proxies request to:


https://api.paraheights.com/edzy-api/hackathon/task/quizDetails


This avoids CORS issues and keeps the frontend clean.

---

## 📦 Installation & Setup

### 1) Clone the repo
```bash
git clone https://github.com/Anshu31s/edzy-quiz-app/
cd edzy-quiz-app

2) Install dependencies
npm install

3) Run the dev server
npm run dev


Open in browser:

http://localhost:3000

🧪 Payload Example

Request body sent to API:

{
  "examSubjectName": "Class 10 - English",
  "numberOfQuestions": 5
}
