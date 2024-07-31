# Local testing deployment

## Setup

You just need to set all env variables in `client/.env` with **VITE_API_URL** equal to http://localhost:8081, put `app.key` and `app.pub` in `server/src/main/resouces` and run docker compose command:

```bash
docker compose up -d
```
