const API_BASE_URL = "https://api.komos.ai/public/v1";

type BankStatementInputs = {
  accountId: string;
  bankPortal: string;
  statementMonth: string;
  expectedEndingBalance: string;
  reconciliationSystem: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function queueKomosTask(inputs: BankStatementInputs) {
  const apiKey = requireEnv("KOMOS_API_KEY");
  const taskId = requireEnv("KOMOS_TASK_ID");

  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/runs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs,
      clientRequestId: `bank-statement-${inputs.accountId}-${inputs.statementMonth}`,
    }),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(`Komos API returned HTTP ${response.status}: ${JSON.stringify(body)}`);
  }

  return body;
}

async function main() {
  const run = await queueKomosTask({
    accountId: "operating_98765",
    bankPortal: "Example Treasury Portal",
    statementMonth: "2026-04",
    expectedEndingBalance: "125000.00",
    reconciliationSystem: "NetSuite",
  });

  console.log(JSON.stringify(run, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
