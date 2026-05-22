"""LangChain compatible tool for queueing Komos task runs."""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from typing import Any

from langchain_core.tools import tool


API_BASE_URL = 'https://api.komos.ai/public/v1'


def queue_komos_task(task_id: str, inputs: dict[str, Any] | None = None) -> dict[str, Any]:
    api_key = os.environ['KOMOS_API_KEY']
    payload = {
        'inputs': inputs or {},
        'clientRequestId': None,
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
            return json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode('utf-8')
        raise RuntimeError(f'Komos API returned HTTP {exc.code}: {body}') from exc


@tool
def run_komos_task(task_id: str, inputs_json: str = '{}') -> str:
    """Queue a Komos task run and return the run payload as JSON."""

    inputs = json.loads(inputs_json)
    result = queue_komos_task(task_id, inputs)
    return json.dumps(result)
