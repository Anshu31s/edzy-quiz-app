import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      "https://api.paraheights.com/edzy-api/hackathon/task/quizDetails",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    
    return NextResponse.json(data, { status: res.status });
    
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error", details: String(err) },
      { status: 500 }
    );
  }
}
