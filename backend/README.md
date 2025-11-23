# 🛠️ Backend Service -- README

## 📌 Project Title

**Node.js Express Backend with PostgreSQL & Sequelize**

## 📖 Introduction

This project is a backend service built with **Node.js**, **Express**,
and **PostgreSQL**, using **Sequelize ORM** for database interactions.\
It provides the foundational structure for building an HRMS (Human
Resource Management System) or any similar application requiring
authentication, database connectivity, and structured APIs.

The environment configuration is handled through `.env`, and development
mode is powered by `nodemon`.

------------------------------------------------------------------------

## ✨ Features

-   Express-based REST API backend\
-   PostgreSQL database connection\
-   Sequelize ORM with Sequelize CLI\
-   JWT authentication support\
-   Secure password hashing with bcrypt\
-   CORS and cookie parsing enabled\
-   dotenv-based configuration\
-   Auto-reload during development using nodemon

------------------------------------------------------------------------

## 🧰 Tech Stack

-   **Node.js**
-   **Express.js**
-   **PostgreSQL**
-   **Sequelize (ORM)**
-   **JWT Authentication**
-   **bcrypt (Password hashing)**

------------------------------------------------------------------------

## 📁 Project Structure

    project/
    │
    ├── src/
    │   ├── index.js              # Server start file
    │   ├── models/               # Sequelize models
    │   ├── controllers/          # Request handlers
    │   ├── routes/               # API routes
    │   ├── middlewares/          # JWT, validation, etc.
    │   └── config/               # Sequelize config, DB connection
    │
    ├── .env
    ├── .gitignore
    ├── package.json
    └── package-lock.json

------------------------------------------------------------------------

## ⚙️ Installation

### 1️⃣ Clone the repository

``` bash
git clone <your-repo-url>
cd backend
```

### 2️⃣ Install dependencies

``` bash
npm install
```

------------------------------------------------------------------------


## 🚀 Running the Project

### ▶️ Development mode

``` bash
npm start
```

This runs:

    nodemon index.js

------------------------------------------------------------------------

## 🗄️ Database Setup

This project uses **Sequelize CLI** for migrations and models.

### Initialize Sequelize (if needed)

``` bash
npx sequelize-cli init
```

### Run migrations

``` bash
npx sequelize-cli db:migrate
```

### Run seeders

``` bash
npx sequelize-cli db:seed:all
```

Ensure your PostgreSQL database exists:

``` bash
createdb hrms_db
```

------------------------------------------------------------------------

## 📝 Scripts

  Script        Description
  ------------- ----------------------------
  `npm start`   Start server using nodemon
  `npm test`    Placeholder test script

------------------------------------------------------------------------

## 📦 Dependencies

### Runtime

-   express\
-   body-parser\
-   cors\
-   cookie-parser\
-   pg\
-   sequelize\
-   bcrypt\
-   jsonwebtoken\
-   dotenv

### Dev

-   nodemon\
-   sequelize-cli

------------------------------------------------------------------------

## 🛠️ Troubleshooting

### Server not starting?

-   Ensure `.env` is configured.
-   PostgreSQL must be running.

### Database connection error?

-   Check DB credentials.
-   Make sure `hrms_db` exists.

### Sequelize not recognized?

``` bash
npm install --save-dev sequelize-cli
```

------------------------------------------------------------------------

## 📄 License

**ISC License**
