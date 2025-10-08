Microservice run guide

This repo supports running services in two modes:

- HTTP mode (for apps that expose REST endpoints): each app has `src/main.ts` (HTTP server).
- Kafka microservice mode: each app has `src/micro-main.ts` which starts a Kafka-only microservice using Nest's microservices transport.

Recommended local setup (pure microservice architecture):

1. Start Kafka locally and ensure `KAFKA_BROKER` points to your broker (default: localhost:9092).
2. From the repo root run `npm install`.
3. Start services in separate terminals:
   - Gateway (HTTP): npm run start:gateway
   - Auth microservice (Kafka-only): npm run start:auth:micro
   - Movies microservice (Kafka-only): npm run start:movies:micro
   - Comments microservice (Kafka-only): npm run start:comments:micro

Flow:
- Clients call the API gateway (HTTP) for REST endpoints (e.g., GET /api/movies)
- Gateway validates auth (via Kafka introspect to Auth service) and then forwards requests to the respective microservice over Kafka (e.g., 'movies.list')
- Microservices process requests and return responses over Kafka; gateway returns those responses to the client.

Notes:
- Keep `main.ts` files if you want to run the service as an HTTP server directly (for admin endpoints or backward compatibility). Use `micro-main.ts` when running the app purely as a microservice.
- Do NOT commit production keys into the repo. Use a secret manager for private keys and a JWKS endpoint for public keys in production.

