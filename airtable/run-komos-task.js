// Airtable scripting extension example.
// Create input variables named KOMOS_API_KEY, KOMOS_TASK_ID, and recordId.

const { KOMOS_API_KEY, KOMOS_TASK_ID, recordId } = input.config();

if (!KOMOS_API_KEY || !KOMOS_TASK_ID) {
  throw new Error("Set KOMOS_API_KEY and KOMOS_TASK_ID input variables.");
}

const table = base.getTable("Tasks");
const record = recordId ? await table.selectRecordAsync(recordId) : null;

const response = await fetch(`https://api.komos.ai/public/v1/tasks/${KOMOS_TASK_ID}/runs`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${KOMOS_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    inputs: {
      source: "airtable",
      recordId: record?.id,
      recordName: record?.name,
    },
    clientRequestId: `airtable-${record?.id ?? Date.now()}`,
  }),
});

const body = await response.json();

if (!response.ok) {
  throw new Error(`Komos API returned HTTP ${response.status}: ${JSON.stringify(body)}`);
}

output.markdown(`Queued Komos task run: **${body.id ?? "created"}**`);
