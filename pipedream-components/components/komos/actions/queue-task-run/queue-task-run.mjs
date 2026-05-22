import komos from "../../komos.app.mjs";

export default {
  key: "komos-queue-task-run",
  name: "Queue Task Run",
  description: "Queue a saved Komos task run with optional inputs.",
  version: "0.0.1",
  type: "action",
  props: {
    komos,
    taskId: {
      propDefinition: [komos, "taskId"],
    },
    inputs: {
      propDefinition: [komos, "inputs"],
    },
    clientRequestId: {
      propDefinition: [komos, "clientRequestId"],
    },
  },
  async run({ $ }) {
    const response = await this.komos.queueTaskRun({
      $,
      taskId: this.taskId,
      inputs: this.inputs,
      clientRequestId: this.clientRequestId,
    });

    const runId = response.id ?? response.run?.id;
    $.export("$summary", runId ? `Queued Komos task run ${runId}` : "Queued Komos task run");
    return response;
  },
};
