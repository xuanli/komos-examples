import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.KOMOS_API_KEY;
  const taskId = process.env.KOMOS_TASK_ID;

  if (!apiKey || !taskId) {
    return NextResponse.json(
      { error: "Missing KOMOS_API_KEY or KOMOS_TASK_ID" },
      { status: 500 },
    );
  }

  const inputs = await request.json().catch(() => ({}));

  const response = await fetch(`https://api.komos.ai/public/v1/tasks/${taskId}/runs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs,
      clientRequestId: crypto.randomUUID(),
    }),
  });

  const body = await response.json();

  return NextResponse.json(body, { status: response.status });
}
