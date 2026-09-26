# Taller 2 — Nginx + Docker

## API REST desarrollada con Node.js, Express, Docker y Nginx.

### Setup
```bash
docker compose up --build
```

Docker Compose crea dos servicios:

api — Backend Node.js + Express en el puerto 3000.  

nginx — Reverse proxy y punto de entrada en el puerto 8080.

Una vez levantados los servicios, la API está disponible en:

http://localhost:8080

Por ejemplo:

GET http://localhost:8080/health  

GET http://localhost:8080/api/products  

GET http://localhost:8080/api/products/1  
