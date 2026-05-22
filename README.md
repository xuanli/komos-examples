# Komos Examples

Public examples for running Komos tasks from code, schedulers, and automation platforms.

Komos is an AI automation platform for browser workflows, document parsing, integrations, and scheduled operations. A Komos task can browse websites, call APIs, parse files, process data with AI, and return structured outputs.

## Useful Links

| Resource | URL |
| --- | --- |
| Komos | https://www.komos.ai/ |
| Documentation | https://docs.komos.ai/ |
| API introduction | https://docs.komos.ai/api-reference/introduction |
| Queue a task run | https://docs.komos.ai/api-reference/task-runs/queue |
| MCP server | https://docs.komos.ai/mcp-server |

## Examples

| Example | What it shows |
| --- | --- |
| [`python/trigger_task.py`](python/trigger_task.py) | Queue a Komos task run from Python with only the standard library. |
| [`typescript/trigger-task.ts`](typescript/trigger-task.ts) | Queue a Komos task run from TypeScript using `fetch`. |
| [`.github/workflows/run-komos-task.yml`](.github/workflows/run-komos-task.yml) | Run a Komos task from GitHub Actions on a schedule or manually. |

## Environment Variables

| Variable | Description |
| --- | --- |
| `KOMOS_API_KEY` | Organization scoped API key from the Komos dashboard. |
| `KOMOS_TASK_ID` | The task ID to run. |

## Basic Flow

1. Create or choose a task in Komos.
2. Create an API key in the Komos dashboard.
3. Set `KOMOS_API_KEY` and `KOMOS_TASK_ID`.
4. Run one of the examples.

## API Shape

Queueing a run sends a `POST` request to:

```text
https://api.komos.ai/public/v1/tasks/{taskId}/runs
```

The request body can include task inputs and an optional idempotency key:

```json
{
  "inputs": {
    "company": "Acme Corp"
  },
  "clientRequestId": "example-run-001"
}
```

See the full API reference at https://docs.komos.ai/api-reference/introduction.

## Security

Do not commit real API keys. Store keys in environment variables, your deployment platform secret store, or GitHub Actions secrets.
