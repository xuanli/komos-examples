# Regulated Operations Examples

These examples show how to trigger Komos tasks from operations systems in regulated workflows.

Komos works well when the work depends on portal logins, documents, browser forms, audit logs, and human review. A task can run inside Komos while your system keeps the case record, policy decision, and reviewer workflow.

## Examples

| Example | Scenario |
| --- | --- |
| [`cra-adverse-action.ts`](cra-adverse-action.ts) | Queue an FCRA adverse action workflow for a consumer reporting agency or employer. |
| [`insurance-eligibility.ts`](insurance-eligibility.ts) | Queue a payer portal eligibility check for a clinic or revenue cycle team. |
| [`bank-statement-reconciliation.ts`](bank-statement-reconciliation.ts) | Queue a bank portal statement download and reconciliation workflow. |

## Related Pages

| Page | URL |
| --- | --- |
| Background screening automation | https://www.komos.ai/solutions/background-screening |
| FCRA adverse action automation | https://www.komos.ai/use-cases/fcra-adverse-action-automation |
| Insurance eligibility verification automation | https://www.komos.ai/use-cases/insurance-eligibility-verification |
| Finance operations automation | https://www.komos.ai/solutions/finance |

## Required Environment

Set these variables before running any TypeScript example.

```bash
export KOMOS_API_KEY="sk_live_..."
export KOMOS_TASK_ID="your-task-id"
```

Each example sends realistic input names. Match them to the inputs on your saved Komos task.
