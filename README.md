# Prueba Técnica - Gestor de Tareas

Este proyecto es una aplicación de gestión de tareas desarrollada con React (frontend), Express con Prisma (backend) y PostgreSQL (base de datos).

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Ejecución del proyecto

Sigue estos pasos para ejecutar el proyecto:

1. Clona este repositorio

```bash
git clone https://github.com/Laura0310/gestor-tareas.git
```


2. Construye las imágenes de Docker

```bash
docker-compose build
```

3. Inicia los contenedores con Docker Compose

```bash
docker-compose up
```

4. Espera a que todos los servicios estén en funcionamiento. El proceso incluye:

   - Inicio de la base de datos PostgreSQL
   - Ejecución automática de migraciones de Prisma
   - Carga de datos iniciales (seeds)
   - Inicio del servidor backend
   - Inicio del frontend

5. Accede a la aplicación:
   - **Frontend**: http://localhost:3000
   - **API Backend**: http://localhost:5001

## Credenciales de prueba

Se ha configurado un usuario de prueba que puedes utilizar para acceder:

- **Email**: test@example.com
- **Contraseña**: password123

## Comandos útiles

```bash
# Construir las imágenes
docker-compose build

# Iniciar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener los contenedores
docker-compose down
```

## Notas

- Todas las configuraciones necesarias ya están incluidas en los archivos Docker.
- Las migraciones y seeds se ejecutan automáticamente al iniciar.
- Los cambios realizados en el código se reflejarán automáticamente gracias a los volúmenes configurados.
