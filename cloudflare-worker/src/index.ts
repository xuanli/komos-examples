export interface Env {
  KOMOS_API_KEY: string;
  KOMOS_TASK_ID: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const inputs = await request.json().catch(() => ({}));

    const response = await fetch(
      `https://api.komos.ai/public/v1/tasks/${env.KOMOS_TASK_ID}/runs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.KOMOS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs,
          clientRequestId: crypto.randomUUID(),
        }),
      },
    );

    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "application/json",
      },
    });
  },
};
