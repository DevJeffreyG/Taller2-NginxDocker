# Taller 2 — Nginx + Docker

API REST desarrollada con Node.js, Express, Docker y Nginx.

## Descripción de la solución
Este proyecto conteneriza una API REST desarrollada con Node.js y Express empleando Docker y Docker compose. Adicionalmente, se evita exponer el backend directamente implementando Nginx como reverse proxy, este el unico punto de entrada publico y redirige el el trafico de los clientes al la API.

Docker Compose crea dos servicios:

api — Backend Node.js + Express en el puerto 3000.  

nginx — Reverse proxy y punto de entrada en el puerto 8080.

Una vez levantados los servicios, la API está disponible en:

http://localhost:8080

Por ejemplo:

GET http://localhost:8080/health  

GET http://localhost:8080/api/products  

GET http://localhost:8080/api/products/1 

## Arquitectura implementada

### Nginx:
Redirecciona el tráfico entrante hacia la API usando http://api:3000
- Puerto Host: 8080
- puerto contenedor: 8080

### API (Backend con Node.js y Express)
Procesamiento de solicitudes
- Puerto interno: 3000

```
     HOST
       |
       | :8080
       v
+-------------+
|    nginx    |
+------+------+
       |
Docker Network
       |
       v
+-------------+
|     api     |
|    :3000    |
+-------------+
```

## Instrucciones para ejecutar proyecto

1. Iniciar proyecto
```bash
docker compose up -d --build
```
2. Verificar el estado de los contenedores 
```bash
docker compose ps
```

## Comandos Docker utilizados

```bash
docker compose up -d --build
```
```bash
docker compose ps
```
```bash
docker compose logs
```
```bash
docker inspect backend-api 
```
```bash
docker build -t backend-api .
```

## Explicacion de ports vs expose

La propiedad `ports` se utiliza publicar un puerto del contenedor hacia la máquina host, haciendo que el servicio sea accesible tanto en la red privada de Docker como desde el exterior a través de localhost. Por otro lado la propiedad `expose` solo indica que puertos dentro de la red interna de Docker sin publicarlos en a interfaz del host. En el proyecto se utiliza `ports` para publicar el puerto 8080 de Nginx y permitir el acceso desde el host, mientras que se utiliza `expose` del puerto 3000 de la API para permitir la comunicación entre contenedores.

## Explicación de localhost vs nombre del servicio Docker

## Evidencias de las pruebas realizadas.

## Explicación del error producido durante el ejercicio de troubleshooting.