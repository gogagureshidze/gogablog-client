# ✍️ Goga Blog — Frontend

Welcome to the frontend repository of **Goga Blog**, a modern, full-featured blog platform designed for seamless content creation and consumption. This application provides a high-performance, responsive user interface that allows users to explore articles, engage with content, and manage their own posts in a clean, aesthetic environment.

## 🚀 Overview

Goga Blog is built with a focus on user experience, offering a sleek interface for both readers and authors. It serves as the client-side interface for the Goga Blog ecosystem, communicating with a dedicated backend API to deliver real-time content updates and secure user management.

**What you can do:**
*   **Explore:** Browse a feed of recent articles with smooth loading states.
*   **Create & Edit:** Write professional-grade blog posts using a built-in rich text editor.
*   **Engage:** Read full articles and interact via the integrated comment system.
*   **Personalize:** Toggle between Light and Dark modes for optimal reading comfort.
*   **Contact:** Directly reach out to the site owner via a secure contact form.

## 🛠 Tech Stack

*   **Framework:** [React](https://reactjs.org/) (v18)
*   **Routing:** [React Router Dom](https://reactrouter.com/) (v6)
*   **UI Components:** [Material UI (MUI)](https://mui.com/) & [Lucide React](https://lucide.dev/)
*   **Rich Text Editor:** [React Quill](https://github.com/zenoamaro/react-quill)
*   **API Client:** [Axios](https://axios-http.com/)
*   **State Management:** React Context API (Auth & Theme)
*   **Mailing Service:** [EmailJS](https://www.emailjs.com/)
*   **Styling:** Modern CSS3 with Responsive Design

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:
*   **Node.js:** v14.x or higher (v18+ recommended)
*   **npm:** v6.x or higher (or **yarn**)
*   **Git:** To clone the repository

## ⚙️ Local Setup & Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/goga-blog-client.git
    cd goga-blog-client
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory (see the [Environment Variables](#environment-variables) section below).

4.  **Start the Development Server:**
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

## 🔐 Environment Variables

To connect the frontend to the backend and external services, create a `.env` file in the root directory with the following keys:

```env
# Backend API Base URL
REACT_APP_SERVER_URL=http://localhost:4000/

# EmailJS Configuration (for Contact Page)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## ✨ Key Features & Pages

*   **Home Page:** A dynamic feed displaying all published blog posts with pagination/infinite scroll support.
*   **Post Details:** A dedicated view for reading full articles, featuring rich-text rendering and comment sections.
*   **Admin Dashboard (Create/Edit):** Secured routes for authorized users to write new articles or update existing ones using the Quill editor.
*   **Authentication:** Robust Login, Registration, and Password Recovery flows (including Forgot/Reset Password).
*   **Contact Page:** A direct communication channel integrated with EmailJS.
*   **User Context:** Persistent authentication state management using JWT and local storage.

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Navbar, Footer, Post Cards)
├── context/          # Context providers for Auth and Dark Mode
├── pages/            # View components for each route
│   ├── Home.jsx      # Main landing page
│   ├── PostPage.jsx  # Individual article view
│   ├── Create.jsx    # Post creation interface
│   └── ...           # Auth and static pages
├── util/             # Utility functions (API helpers, image uploads)
├── App.jsx           # Main App component & Route definitions
└── index.jsx         # Application entry point
```

---
*Built with ❤️ by Goga Gureshidze*
