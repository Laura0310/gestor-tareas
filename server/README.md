# API de Gestión de Tareas

Este proyecto es una API backend construida con Node.js, Express y PostgreSQL (con Prisma ORM) para un Dashboard de Gestión de Tareas. Proporciona autenticación de usuarios y funcionalidades de gestión de tareas, incluyendo crear, actualizar y eliminar tareas. Esta API está diseñada para trabajar en conjunto con una aplicación frontend y fue desarrollada como parte de una prueba técnica.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Futuras Mejoras](#futuras-mejoras)

## Características

- **Autenticación de Usuario:**
  - Registro de nuevos usuarios.
  - Inicio de sesión y recepción de token para peticiones autenticadas.
- **Gestión de Tareas:**
  - Crear, actualizar y eliminar tareas.
  - Las tareas están asociadas con usuarios y agrupadas por estado ("TO_DO", "IN_PROGRESS", "DONE").
- **Exportación de Datos:**
  - Exportación de tareas en formato JSON o CSV.
  - Inclusión de métricas y estadísticas en los archivos exportados.
- **Seguridad:**
  - Implementa autenticación basada en JWT.
  - Contraseñas encriptadas con bcrypt.
- **Persistencia de Datos:**
  - Los datos se almacenan en PostgreSQL utilizando Prisma ORM.

## Tecnologías Utilizadas

- **Express:** Framework web para Node.js.
- **PostgreSQL:** Base de datos relacional.
- **Prisma:** ORM para interactuar con la base de datos.
- **JWT:** Para autenticación de usuarios.
- **bcrypt:** Para encriptación de contraseñas.
- **TypeScript:** Para tipado estático y mejor desarrollo.
- **CORS:** Para habilitar solicitudes entre dominios.

### Modelo-Vista-Controlador (MVC)

El backend está estructurado en tres capas principales:

**Modelo (M)**

- Maneja la estructura de datos y las interacciones con PostgreSQL a través de Prisma.
- Define los modelos para entidades como Usuario y Tarea.

**Controlador (C)**

- Contiene la lógica de negocio y procesa las solicitudes entrantes.
- Maneja autenticación, gestión de tareas e interacciones con la base de datos.

**Rutas (Equivalente a Vista)**

- Define los endpoints de la API y los conecta con sus respectivos controladores.
- Utiliza Express.js para manejar solicitudes HTTP.

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Laura0310/gestor-tareas.git
```

### 2. Acceder al directorio del servidor

```bash
cd gestor-tareas/server
```

### 3. Instalar dependencias

```sh
npm install
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en el directorio raíz y añade:

```env
DATABASE_URL="postgresql://LauraAcosta:password@localhost:5432/postgres?schema=public"
JWT_SECRET="supersecreto"
PORT=5001
```

### 5. Configurar la base de datos

```sh
npx prisma migrate dev --name init
```

### 6. Ejecutar la aplicación

```sh
npm run dev
```

El servidor se iniciará en `http://localhost:5001`.

## Uso

### Autenticación de Usuario

- Utiliza los endpoints de autenticación para registrar un nuevo usuario o iniciar sesión.
- Después de iniciar sesión, se proporciona un token que debe incluirse en el encabezado `Authorization` usando el formato `Bearer <token>` para acceder a las rutas protegidas.

### Gestión de Tareas

- Una vez autenticado, utiliza los endpoints de tareas para crear, actualizar o eliminar tareas.
- Las tareas están asociadas al usuario autenticado y agrupadas por estado.

### Exportación de Datos

- Utiliza los endpoints de exportación para descargar tus tareas en formato JSON o CSV.
- Los archivos exportados incluyen tanto las tareas como métricas relevantes.

## Endpoints de la API

### Autenticación

#### Registro de Usuario

`POST /api/auth/register`

##### Cuerpo de la Solicitud:

```json
{
  "name": "Nombre Usuario",
  "email": "usuario@ejemplo.com",
  "password": "tucontraseña"
}
```

##### Respuesta:

```json
{
  "token": "token_jwt_aquí",
  "user": { "id": "id_usuario", "name": "Nombre Usuario", "email": "usuario@ejemplo.com" }
}
```

#### Inicio de Sesión

`POST /api/auth/login`

##### Cuerpo de la Solicitud:

```json
{
  "email": "usuario@ejemplo.com",
  "password": "tucontraseña"
}
```

##### Respuesta:

```json
{
  "token": "token_jwt_aquí",
  "user": { "id": "id_usuario", "name": "Nombre Usuario", "email": "usuario@ejemplo.com" }
}
```

### Gestión de Tareas

**Nota**: Todos los endpoints de tareas requieren un encabezado `Authorization` con un token JWT válido.

#### Crear Tarea

`POST /api/tasks`

##### Cuerpo de la Solicitud:

```json
{
  "title": "Título de la Tarea",
  "description": "Descripción de la Tarea",
  "status": "TO_DO"
}
```

##### Respuesta: Objeto de la tarea recién creada.

#### Obtener Tareas

`GET /api/tasks`

##### Respuesta:

```json
{
  "TO_DO": [ { "id": "id_tarea", "title": "...", ... } ],
  "IN_PROGRESS": [ ... ],
  "DONE": [ ... ]
}
```

#### Obtener Tarea por ID

`GET /api/tasks/:id`

##### Respuesta: Objeto de la tarea para el ID especificado.

#### Actualizar Tarea

`PUT /api/tasks/:id`

##### Cuerpo de la Solicitud: Objeto con los campos de tarea actualizados.

##### Respuesta: Objeto de tarea actualizado.

#### Eliminar Tarea

`DELETE /api/tasks/:id`

##### Respuesta:

```json
{ "message": "Tarea eliminada" }
```

### Exportación de Datos

#### Exportar Tareas

`GET /api/export/tasks/download/:format`

- `:format` puede ser "json" o "csv"

##### Respuesta: Archivo de descarga con tareas y métricas en el formato especificado.
