import json
import sys
from pathlib import Path

import requests


BASE_URL = "http://127.0.0.1:8000"


def test_crop():
    url = f"{BASE_URL}/recommend_crop/"
    payload = {
        "N": 90,
        "P": 42,
        "K": 43,
        "temperature": 23.5,
        "humidity": 80,
        "ph": 6.5,
        "rainfall": 200,
    }
    resp = requests.post(url, json=payload, timeout=60)
    print("CROP STATUS:", resp.status_code)
    try:
        print(json.dumps(resp.json(), indent=2))
    except Exception:
        print(resp.text)


def test_disease(image_path: str):
    url = f"{BASE_URL}/detect_disease/"
    path = Path(image_path)
    if not path.exists():
        print(f"Image not found: {path}")
        sys.exit(1)
    with open(path, "rb") as f:
        files = {"image": (path.name, f, "image/jpeg")}
        resp = requests.post(url, files=files, timeout=120)
    print("DISEASE STATUS:", resp.status_code)
    try:
        print(json.dumps(resp.json(), indent=2))
    except Exception:
        print(resp.text)


if __name__ == "__main__":
    # Usage:
    #   python scripts/test_endpoints.py               # test crop only
    #   python scripts/test_endpoints.py path\to.jpg  # test crop + disease
    test_crop()
    if len(sys.argv) > 1:
        test_disease(sys.argv[1])


