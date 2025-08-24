# Urvann - Mini Plant Store

A full-stack web application built for the Urvann Software Development Intern assignment. This project features a complete, user-friendly plant catalog with search, filtering, sorting, and an admin panel for adding new plants.

**Live Demo Links:**
*   **Frontend (Vercel):** [Your Live Frontend Link Here]
*   **Backend (Render):** [Your Live Backend Link Here]

---

## Features

This project implements all the required features and goes the extra mile with additional user-centric functionalities.

-   **Dynamic Plant Catalog:** Browse a grid of over 50 plants fetched from the backend, with names, prices, and images.
-   **Advanced Search & Filter:**
    -   Case-insensitive search for plant names, descriptions, or categories.
    -   Filter plants by a specific category using a dropdown.
-   **Sort Functionality:** Sort the plant catalog by Price (Low to High, High to Low) or Name (A-Z) for easier browsing.
-   **Stock Availability:** Each plant card clearly indicates if an item is "In Stock" or "Out of Stock".
-   **"Notify Me" Feature:** For out-of-stock items, users can enter their email to be notified when the plant is available again. This is a key e-commerce feature for user retention.
-   **Admin Panel:** A dedicated page (`/admin/add`) allows an admin to add new plants to the database with complete validation on both the frontend and backend.
-   **Responsive Design:** The UI is fully responsive and provides a seamless experience on both desktop and mobile devices.
-   **Loading & Error States:** The application displays a loading indicator while fetching data and shows user-friendly error messages if the API fails.

---

## Tech Stack

-   **Frontend:**
    -   React (Hooks, Functional Components)
    -   React Router for page navigation
    -   CSS for custom styling and responsiveness
-   **Backend:**
    -   Node.js
    -   Express.js for the REST API
-   **Database:**
    -   MongoDB
    -   Mongoose for object data modeling

---

## Getting Started Locally

To run this project on your local machine, follow these steps:

**Prerequisites:**
-   Node.js and npm installed
-   MongoDB installed locally or a connection string from MongoDB Atlas

**1. Clone the repository:**
```bash
git clone <your-repo-url>
cd UrvaanAssignment
```

**2. Setup the Backend:**
```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the /server directory and add your MongoDB connection string:
MONGO_URI=your_mongodb_connection_string

# Start the backend server
npm start
```
The backend will be running on `http://localhost:5000`.

**3. Setup the Frontend:**
```bash
# Navigate to the client directory from the root
cd ../client

# Install dependencies
npm install

# Start the frontend React app
npm start
```
The frontend will open and run on `http://localhost:3000`.