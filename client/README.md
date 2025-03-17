# Aplicación de Gestión de Tareas con Dashboard

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Uso de la Aplicación](#uso-de-la-aplicación)
- [Justificación de Métricas](#justificación-de-métricas)
- [Características Adicionales](#características-adicionales)
- [Contacto](#contacto)

## Descripción

Esta aplicación ha sido desarrollada como parte de la prueba técnica para Erco Energía. Implementa un sistema completo de gestión de tareas con autenticación y un dashboard analítico que muestra métricas relevantes para el seguimiento de tareas, permitiendo a los usuarios administrar tareas (crear, editar, marcar como completadas y eliminar) y visualizar un Dashboard con métricas clave sobre el estado de sus tareas.

### Funcionalidades principales:

- **Gestión de tareas**: Crear, listar, editar, eliminar, cambiar su estado (pendiente, en progreso, completado).
- **Autenticación**: Sistema con JWT para mantener la sesión del usuario.
- **Dashboard analítico**: Visualización de métricas clave sobre las tareas (la cantidad de tareas en cada sección y una barra de progreso según las tareas completadas y su total).
- **Interfaz intuitiva**: Diseño limpio y responsive para facilitar la gestión de tareas.
- **Exportación de datos**: Posibilidad de descargar las tareas y métricas en formato CSV o JSON.

## Tecnologías Utilizadas

### Frontend

- **React**: Framework para desarrollo de la interfaz de usuario
- **TypeScript**: Para tipado estático y mejor desarrollo
- **React Router**: Para gestión de rutas
- **Axios**: Para comunicación con el backend
- **Redux**: Para gestión del estado global
- **Tailwind CSS**: Para estilizado de componentes
- **FontAwesome**: Para los iconos

## Instalación

### Requisitos previos

- Node.js (v22.14.0 o superior)
- npm (v10.9.2 o superior)

### Pasos de instalación

1. Clonar el repositorio:

2. Instalar dependencias del frontend:
   ```bash
   cd client
   npm install
   ```

## Ejecución

### Iniciar el frontend:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto frontend con:

```
VITE_API_URL=http://localhost:5001/api
```

## Uso de la Aplicación

### Autenticación

- Regístrate para crear una nueva cuenta
- Inicia sesión con tu correo y contraseña

### Gestión de Tareas

- Para crear una nueva tarea, haz clic en el botón "Añadir tarea"
- Para editar una tarea, haz clic en el icono de edición junto a la tarea (ya sea para modificar información de la misma o su estado)
- Para eliminar, haz clic en el icono de papelera

### Dashboard

- El dashboard principal muestra las tareas organizadas por estado (Pendiente, En Progreso, Completado)
- Se muestra una barra de progreso que indica el porcentaje de tareas completadas sobre el total de estas
- Cada columna muestra el número total de tareas en ese estado

### Exportación de Datos

- Utiliza el botón "Exportar" para descargar tus tareas
- Selecciona el formato deseado (CSV o JSON) desde el menú desplegable
- La exportación incluye tanto las tareas como las métricas principales

## Justificación de Métricas

El dashboard incluye las siguientes métricas clave:

### 1. Número total de tareas

**Justificación**: Esta métrica proporciona una visión general del volumen de trabajo. Es fundamental para entender la carga de tareas que el usuario está gestionando.

**Relevancia para el usuario**:

- Permite al usuario conocer el alcance total de sus responsabilidades
- Sirve como indicador base para evaluar la productividad general

### 2. Distribución de tareas por estado

**Justificación**: Esta métrica muestra cómo se distribuyen las tareas entre los diferentes estados (Pendiente, En Progreso, Completado). Proporciona una visión clara del flujo de trabajo.

**Relevancia para el usuario**:

- Permite identificar cuellos de botella (muchas tareas en progreso)
- Muestra el balance entre tareas nuevas y completadas

### 3. Porcentaje de tareas completadas

**Justificación**: Esta métrica refleja directamente el progreso del usuario. Es una manera efectiva de visualizar el avance en los objetivos.

**Relevancia para el usuario**:

- Proporciona una medida clara del avance en el trabajo
- Motiva al ver el progreso de forma visual y cuantificable

## Características Adicionales

### Exportación de datos

La aplicación permite exportar las tareas y las métricas en formato CSV o JSON, facilitando:

- Análisis adicional en herramientas externas
- Respaldo de la información
- Integración con otros sistemas o aplicaciones

### Interfaz responsive

La aplicación está diseñada para funcionar correctamente en dispositivos móviles, tablets y ordenadores.
