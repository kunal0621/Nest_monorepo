Auth microservice

This demo auth service issues JWTs (HS256) and provides a simple introspection endpoint.

Seeds:
- alice / password  (role: user)
- admin / adminpass (role: admin)

Environment:
- JWT_SECRET (defaults to 'dev-secret')

Endpoints:
- POST /api/auth/login  { username, password }
- POST /api/auth/introspect { token }

Example (PowerShell):

$body = @{ username = 'alice'; password = 'password' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:3001/api/auth/login -Body $body -ContentType 'application/json'

Then call api-gateway (http://localhost:3000) with Authorization: Bearer <accessToken> to see user attached by the gateway guard.
