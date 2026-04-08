# OpenShelf - Modern Book Store Application
here's the link - openshelf-frontend.onrender.com
OpenShelf is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to provide a seamless and interactive experience for book lovers. It features a modern, responsive UI with 3D elements, AI-powered book recommendations, and secure user authentication.

## 🚀 Features

-   **Modern UI/UX**: Built with React, TailwindCSS, and DaisyUI for a polished, responsive design.
-   **3D Visuals**: Integrated 3D book models and interactive elements using Three.js and React Three Fiber.
-   **AI Recommendations**: Personalized book suggestions powered by Google Generative AI / OpenAI.
-   **User Authentication**: Secure Login and Signup functionality using JWT and BCrypt.
-   **Book Management**: Browse, search, and manage a collection of books.
-   **Image Uploads**: Book cover uploads handled via Cloudinary and Multer.
-   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React (Vite)
-   **Styling**: TailwindCSS, DaisyUI
-   **Animations**: Framer Motion, GSAP
-   **3D Graphics**: Three.js, OGL
-   **Routing**: React Router DOM (v7)
-   **State Management**: React Context / Hooks
-   **HTTP Client**: Axios

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (Mongoose)
-   **Authentication**: JSON Web Tokens (JWT), BCryptJS
-   **File Storage**: Cloudinary, Multer
-   **AI Integration**: Google Generative AI, OpenAI

## 📦 Installation

Follow these steps to set up the project locally.

### Prerequisites
-   Node.js (v18+ recommended)
-   MongoDB (Local or Atlas URI)
-   Cloudinary Account (for image uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/kunal5946/Book-Store.git
cd Book-Store
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory with the following variables:
```env
PORT=4001
mongoDBURI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENAI_API_KEY=your_openai_key_if_used
GEMINI_API_KEY=your_gemini_key_if_used
```

Start the backend server:
```bash
npm start
```

### 3. Setup Frontend
Open a new terminal and navigate to the Frontend directory:
```bash
cd Frontend
npm install
```

Start the development server:
```bash
npm run dev
```

### 4. Access the App
Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
