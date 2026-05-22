#!/usr/bin/env python3
"""Queue a Komos task run from Python.

Set KOMOS_API_KEY and KOMOS_TASK_ID before running:

    export KOMOS_API_KEY="sk_live_..."
    export KOMOS_TASK_ID="your-task-id"
    python python/trigger_task.py
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request


API_BASE_URL = 'https://api.komos.ai/public/v1'


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        print(f'Missing required environment variable: {name}', file=sys.stderr)
        sys.exit(1)
    return value


def main() -> None:
    api_key = require_env('KOMOS_API_KEY')
    task_id = require_env('KOMOS_TASK_ID')

    payload = {
        'inputs': {
            'example': 'hello from Python',
        },
        'clientRequestId': 'python-example-run',
    }

    request = urllib.request.Request(
        f'{API_BASE_URL}/tasks/{task_id}/runs',
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read().decode('utf-8')
            print(json.dumps(json.loads(body), indent=2))
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode('utf-8')
        print(f'Komos API returned HTTP {exc.code}: {error_body}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
