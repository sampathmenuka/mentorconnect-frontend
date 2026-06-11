# MentorConnect

MentorConnect is a full-stack web application designed to connect mentors and mentees through a secure and user-friendly platform. The system enables users to register, authenticate, manage profiles, and explore mentorship opportunities while providing a modern and responsive user experience.

## 🚀 Live Demo

### Frontend

https://mentorconnect-frontend-wine.vercel.app/login

### Backend API

https://mentorconnect-api.onrender.com

---

## ✨ Features

### Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Protected API endpoints
* Secure password storage

### User Management

* Create user accounts
* Manage user profiles
* Role-based access (Mentor / Mentee)

### Responsive UI

* Modern interface
* Mobile-friendly design
* Responsive layouts

---

## 🛠️ Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Fetch API

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven

### Database

* PostgreSQL

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Render PostgreSQL

---

## 🏗️ System Architecture

```text
Frontend (Next.js)
        │
        ▼
 REST API (Spring Boot)
        │
        ▼
 PostgreSQL Database
```

---

## 📂 Project Structure

### Frontend

```text
src/
├── app/
├── components/
├── services/
├── hooks/
├── lib/
└── types/
```

### Backend

```text
src/
├── controller/
├── service/
├── repository/
├── model/
├── dto/
├── security/
└── config/
```

---

## 📖 API Documentation

### Authentication APIs

| Method | Endpoint             | Description                            |
| ------ | -------------------- | -------------------------------------- |
| POST   | `/api/auth/register` | Register a new user account            |
| POST   | `/api/auth/login`    | Authenticate user and return JWT token |

---

### Register User

#### Endpoint

```http
POST /api/auth/register
```

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "MENTOR"
}
```

#### Success Response

```json
{
  "message": "User registered successfully"
}
```

---

### Login User

#### Endpoint

```http
POST /api/auth/login
```

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Success Response

```json
{
  "token": "jwt-token"
}
```

---

## ⚙️ Local Setup

### Backend Setup

1. Clone the repository

```bash
git clone https://github.com/sampathmenuka/mentorconnect-api.git
```

2. Configure database credentials in `application.properties`

```properties
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

3. Run the application

```bash
./mvnw spring-boot:run
```

---

### Frontend Setup

1. Clone the repository

```bash
git clone https://github.com/sampathmenuka/mentorconnect-frontend.git
```

2. Install dependencies

```bash
npm install
```

3. Create environment file

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

4. Start development server

```bash
npm run dev
```

---

## 🔗 GitHub Repositories

### Frontend Repository

https://github.com/sampathmenuka/mentorconnect-frontend

### Backend Repository

https://github.com/sampathmenuka/mentorconnect-api

---

## 👨‍💻 Author

**Sampath Menuka**

Software Engineering Undergraduate

Sabaragamuwa University of Sri Lanka
