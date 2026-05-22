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
| [`pipedream/run-komos-task.mjs`](pipedream/run-komos-task.mjs) | Pipedream Node.js step for queueing a Komos task. |
| [`n8n/run-komos-task.workflow.json`](n8n/run-komos-task.workflow.json) | Importable n8n workflow using the HTTP Request node. |
| [`airtable/run-komos-task.js`](airtable/run-komos-task.js) | Airtable scripting example for queueing a task from a record. |
| [`cloudflare-worker/src/index.ts`](cloudflare-worker/src/index.ts) | Cloudflare Worker endpoint that queues a Komos task. |
| [`vercel/app/api/run-komos-task/route.ts`](vercel/app/api/run-komos-task/route.ts) | Vercel or Next.js route handler for task runs. |
| [`langchain/komos_tool.py`](langchain/komos_tool.py) | LangChain compatible Python tool wrapper around the Komos API. |
| [`regulated-ops/`](regulated-ops/) | CRA, insurance, and banking operations examples using real workflow shaped inputs. |
| [`pipedream-components/components/komos/`](pipedream-components/components/komos/) | Pipedream registry shaped Komos app and actions. |

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

## Ecosystem Recipes

These examples are intentionally lightweight. They show how to hand off browser workflow execution to Komos from platforms that already orchestrate events, records, webhooks, or agents.

| Platform | Best use |
| --- | --- |
| Pipedream | Trigger a Komos task from an event stream or custom Node.js workflow. |
| n8n | Use Komos when an n8n workflow needs a browser workflow or portal step. |
| Airtable | Run Komos against a record that needs enrichment from a website or document. |
| Cloudflare Workers | Expose a small API endpoint that queues Komos task runs. |
| Vercel | Queue Komos tasks from an app backend or serverless route. |
| LangChain | Give an agent a tool for dispatching a durable Komos task. |

## Regulated Operations Recipes

Komos is useful when an operations team has to run the same browser workflow repeatedly across portals that do not expose clean APIs. These examples focus on regulated workflows where auditability matters.

| Workflow | Example | Related Komos page |
| --- | --- | --- |
| CRA adverse action | [`regulated-ops/cra-adverse-action.ts`](regulated-ops/cra-adverse-action.ts) | https://www.komos.ai/use-cases/fcra-adverse-action-automation |
| Insurance eligibility verification | [`regulated-ops/insurance-eligibility.ts`](regulated-ops/insurance-eligibility.ts) | https://www.komos.ai/use-cases/insurance-eligibility-verification |
| Bank statement reconciliation | [`regulated-ops/bank-statement-reconciliation.ts`](regulated-ops/bank-statement-reconciliation.ts) | https://www.komos.ai/solutions/finance |

For background screening and CRA teams, see the Certn customer story at https://www.komos.ai/solutions/background-screening.

## Security

Do not commit real API keys. Store keys in environment variables, your deployment platform secret store, or GitHub Actions secrets.
