# Proyecto Lista de Tareas

Este es un proyecto de lista de tareas con:

- **Frontend:** React (con filtros, animaciones y estilos modernos)
- **Backend:** C# .NET API RESTful
- **Base de Datos:** PostgreSQL administrado con PgAdmin

## Estructura

- `react-app1/` → Contiene la aplicación de React
- `backend-dotnet/` → Contiene el backend en C# (.NET API)
  

---


##  Cómo ejecutar el proyecto

### 🔹 Frontend (React)

- cd react-app1
- npm install
- npm run dev


### 🔹 Frontend (React)
- cd TaskApi
- dotnet restore
- dotnet run



## 🛢 Configuración de la Base de Datos (PostgreSQL)

1. Asegúrate de tener PostgreSQL instalado y corriendo.
2. Crea una base de datos llamada `ProyectoTaskDB`.
3. Ejecuta el siguiente Script para crear la tabla.

CREATE TABLE Tasks (
    Id SERIAL PRIMARY KEY,
    Text TEXT NOT NULL,
    Done BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMPTZ DEFAULT NOW()
);

