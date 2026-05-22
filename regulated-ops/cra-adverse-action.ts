const API_BASE_URL = "https://api.komos.ai/public/v1";

type AdverseActionInputs = {
  applicantId: string;
  reportId: string;
  decisionReason: string;
  noticeTemplate: string;
  reviewerEmail: string;
  disputeWindowDays: number;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function queueKomosTask(inputs: AdverseActionInputs) {
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
      clientRequestId: `fcra-adverse-action-${inputs.reportId}`,
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
    applicantId: "applicant_12345",
    reportId: "report_67890",
    decisionReason: "Criminal record requires reviewer approved adverse action",
    noticeTemplate: "pre_adverse_action_v4",
    reviewerEmail: "compliance@example.com",
    disputeWindowDays: 5,
  });

  console.log(JSON.stringify(run, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
