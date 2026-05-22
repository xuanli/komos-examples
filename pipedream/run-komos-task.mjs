export default defineComponent({
  name: "Run Komos Task",
  description: "Queue a Komos task run from a Pipedream workflow.",
  props: {
    apiKey: {
      type: "string",
      label: "Komos API Key",
      secret: true,
    },
    taskId: {
      type: "string",
      label: "Komos Task ID",
    },
    inputs: {
      type: "object",
      label: "Task Inputs",
      optional: true,
      default: {},
    },
    clientRequestId: {
      type: "string",
      label: "Client Request ID",
      optional: true,
    },
  },
  async run({ steps, $ }) {
    const response = await fetch(
      `https://api.komos.ai/public/v1/tasks/${this.taskId}/runs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: this.inputs ?? {},
          clientRequestId:
            this.clientRequestId ?? `pipedream-${steps.trigger?.context?.id ?? Date.now()}`,
        }),
      },
    );

    const body = await response.json();

    if (!response.ok) {
      throw new Error(`Komos API returned HTTP ${response.status}: ${JSON.stringify(body)}`);
    }

    $.export("$summary", `Queued Komos task run ${body.id ?? ""}`.trim());
    return body;
  },
});
