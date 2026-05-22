const API_BASE_URL = "https://api.komos.ai/public/v1";

type InsuranceEligibilityInputs = {
  patientId: string;
  payerName: string;
  memberId: string;
  dateOfBirth: string;
  serviceDate: string;
  providerNpi: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function queueKomosTask(inputs: InsuranceEligibilityInputs) {
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
      clientRequestId: `eligibility-${inputs.patientId}-${inputs.serviceDate}`,
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
    patientId: "patient_12345",
    payerName: "Example Health Plan",
    memberId: "M123456789",
    dateOfBirth: "1984-03-18",
    serviceDate: "2026-05-22",
    providerNpi: "1234567890",
  });

  console.log(JSON.stringify(run, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
