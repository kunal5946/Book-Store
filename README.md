# OpenShelf: Modern Full-Stack Book Store Application

OpenShelf is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to provide a highly optimized, secure, and interactive experience for managing and browsing books. The application features secure cookie-based session management, AI-powered book recommendations, Redis caching, rate limiting, and an asynchronous task queue for handling heavy document uploads.

Live Application Link: `openshelf-frontend.onrender.com`

---

## Key Features

* **Secure Authentication**: User signups and logins use JSON Web Tokens (JWT) stored securely within HttpOnly cookies to protect against Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) vulnerabilities.
* **Asynchronous Task Queue (BullMQ)**: Large PDF document uploads are decoupled from the main HTTP request-response loop. The server immediately returns a `202 Accepted` status, delegating the Cloudinary storage upload and MongoDB persistence to a background worker.
* **High-Performance Caching (Redis)**: Integrates an Upstash Redis cache using the Cache-Aside pattern. Popular book lists are cached for 1 hour, and AI recommendation responses are cached for 24 hours to reduce latency and eliminate database/API read costs.
* **Cache Invalidation**: Automatic deletion of key caches (`books:all` and `books:free`) occurs when a new book is successfully uploaded or deleted, ensuring the client-side data remains fresh.
* **API Rate Limiting**: Implements a sliding-window rate limiter backed by Redis. Requests are throttled at 100 requests per 15 minutes per IP to protect server resources and prevent abuse.
* **AI Recommendation Engine**: Personalized book suggestions generated through prompt analysis, utilizing Google Generative AI (Gemini) or OpenAI, complete with database tag-matching fallback algorithms.
* **3D Interactive Graphics**: Incorporates 3D interactive book models on the homepage banner using Three.js and React Three Fiber.

---

## Technical Architecture

### Frontend
* **Core Framework**: React (Vite)
* **Styling**: TailwindCSS, DaisyUI
* **Animations & 3D**: Framer Motion, GSAP, Three.js, React Three Fiber
* **HTTP Client**: Axios (configured with global credentials for secure cookie transmission)

### Backend
* **Runtime**: Node.js (ES Modules)
* **API Framework**: Express.js
* **Database**: MongoDB (Mongoose Object Modeling)
* **Session Security**: JSON Web Tokens, BCryptJS, Cookie-Parser
* **Caching & Queueing**: Redis, BullMQ
* **File Storage**: Cloudinary, Multer
* **Third-Party Integrations**: Google Generative AI, OpenAI

---

## Installation and Configuration

Follow these steps to configure and run the project locally.

### Prerequisites
* Node.js (v18 or higher)
* MongoDB (Local instance or MongoDB Atlas URI)
* Redis (Local instance or Upstash Redis connection string)
* Cloudinary Account (for file storage credentials)

### 1. Clone the Repository
```bash
git clone https://github.com/kunal5946/Book-Store.git
cd Book-Store
```

### 2. Configure the Backend
Navigate to the backend directory and install the dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory with the following variables:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_secret
FRONTEND_URL=http://localhost:5173
REDIS_URL=rediss://default:your_password@your_endpoint.upstash.io:6379
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend development server (using Nodemon):
```bash
npm start
```

### 3. Configure the Frontend
Open a new terminal window, navigate to the frontend directory, and install the dependencies:
```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` directory:
```env
VITE_API_URL=http://localhost:4000
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
Open your browser and navigate to `http://localhost:5173`.

---

## License

This project is licensed under the ISC License.
