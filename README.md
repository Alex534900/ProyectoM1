# Task Manager Full Stack

Aplicación web full stack para gestionar tareas de forma sencilla y segura.
Permite crear, administrar y organizar tareas mediante autenticación de usuarios y operaciones CRUD.

<!-- BADGE_CI -->

## 🚀 Instalación local

Clona este repositorio:

```bash
git clone https://github.com/Alex534900/ProyectoM1.git
cd ProyectoM1
```

Instala las dependencias:

```bash
npm install
```

## 🔐 Variables de entorno

Crea un archivo `.env` con las siguientes claves (sin colocar valores reales en este documento):

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

## 📜 Comandos disponibles

| Comando | Descripción |
| ------- | ----------- |
| `npm run dev` | Levanta el entorno de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm test` | Corre las pruebas automatizadas (pendiente — Sesión 3) |

## 🗄️ Base de datos

El proyecto utiliza PostgreSQL como sistema gestor de base de datos, con migraciones y seeds administrados mediante Prisma ORM.

## 🛠️ Tecnologías utilizadas

- React + TypeScript
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT para autenticación
- bcrypt para protección de contraseñas

## ✨ Características principales

- ✅ Registro e inicio de sesión de usuarios mediante autenticación segura.
- ✅ Gestión completa de tareas (crear, visualizar, actualizar y eliminar).
- ✅ Protección de rutas mediante autenticación con JWT.
- ✅ Persistencia de información utilizando PostgreSQL.
- ✅ Gestión de base de datos mediante Prisma ORM.
- ✅ Organización del proyecto con arquitectura frontend y backend separadas.

## 📂 Estructura del proyecto

```text
ProyectoM1

│
├── fs-projectManager
│   ├── backend
│   ├── prisma
│   ├── public
│   ├── src
│   └── package.json

├── .gitignore
└── README.md
```

## 👨‍💻 Desarrollo

El proyecto fue desarrollado como parte de los módulos M1 y M2, aplicando conceptos de desarrollo full stack, gestión de tareas, autenticación y conexión con base de datos.

## 📝 Estado del proyecto

Actualmente el proyecto cuenta con funcionalidades principales de gestión de tareas.

Las pruebas automatizadas serán incorporadas en la Sesión 3.
