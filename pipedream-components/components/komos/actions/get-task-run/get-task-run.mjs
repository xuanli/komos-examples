import komos from "../../komos.app.mjs";

export default {
  key: "komos-get-task-run",
  name: "Get Task Run",
  description: "Fetch the latest status and outputs for a Komos task run.",
  version: "0.0.1",
  type: "action",
  props: {
    komos,
    runId: {
      propDefinition: [komos, "runId"],
    },
  },
  async run({ $ }) {
    const response = await this.komos.getTaskRun({
      $,
      runId: this.runId,
    });

    const status = response.status ?? response.run?.status ?? "unknown";
    $.export("$summary", `Komos task run status: ${status}`);
    return response;
  },
};
