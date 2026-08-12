# Coral Sense API

The API runs three independent Ultralytics models:

1. `coral-presence-v5.pt` verifies coral presence using a three-state decision policy.
2. `coral-classifier.pt` classifies confirmed coral as healthy or bleached.
3. `waste-detector.pt` detects plastic and other marine-waste classes on every valid image.

## Local setup

```bash
cd Web-App/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
gunicorn --bind 0.0.0.0:5000 server:app
```

Set `VITE_API_URL=http://127.0.0.1:5000` in the frontend environment. For a hosted deployment, set it to the public API URL and add the frontend origin to the backend `ALLOWED_ORIGINS` value.

Do not commit a real `.env` file or browser-visible API keys. Model confidence is not a biological coral-health percentage.

## Endpoints

- `GET /health` reports model readiness.
- `POST /predict` accepts one `image` field as JPG, PNG, or WebP (10 MB by default).
