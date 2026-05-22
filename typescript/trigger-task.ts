const API_BASE_URL = "https://api.komos.ai/public/v1";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function main() {
  const apiKey = requireEnv("KOMOS_API_KEY");
  const taskId = requireEnv("KOMOS_TASK_ID");

  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/runs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        example: "hello from TypeScript",
      },
      clientRequestId: "typescript-example-run",
    }),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(`Komos API returned HTTP ${response.status}: ${JSON.stringify(body)}`);
  }

  console.log(JSON.stringify(body, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
