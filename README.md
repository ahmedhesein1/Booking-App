Booking Web App
===============

A user-friendly web application for managing bookings and reservations. This app is designed to simplify scheduling, enhance user experiences, and support seamless booking management.

Features
--------

-   **User Authentication**:\
    Secure login and signup functionality with JWT-based authentication.

-   **Booking Management**:\
    Create, view, update, and cancel bookings effortlessly.

-   **Admin Panel**:\
    Manage user accounts, monitor activity, and oversee all bookings.
    

Tech Stack
----------

-   **Backend**: Node.js with Express.js
-   **Database**: MongoDB 
-   **Authentication**: JWT-based authentication
-   **Tools**: Postman, Git, VSCode

Getting Started
---------------

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

-   Node.js (v20 or higher)
-   MongoDB 
-   Git

### Installation

1.  Clone the repository:



    `git clone https://github.com/ahmedhesein1/booking-App.git
    cd booking-app`

2.  Set up the **backend**:



    `cd backend
    npm install`


    Start the server:



    `npm start`


4.  Open your browser at `http://localhost:3000`.

API Endpoints
-------------

### Authentication

-   `POST /api/auth/signup` - Register a new user
-   `POST /api/auth/login` - Authenticate and get a token

### Bookings Endpoints

-   `GET /api/hotels` - Retrieve all hotels
-   `POST /api/hotels` - Create a new hotel
-   `PUT /api/hotels/:id` - Update a hotel
-   `DELETE /api/hotels/:id` - Cancel a hotel
-   `GET /api/users` - Retrieve all users
-   `POST /api/users` - Create a new user
-   `PUT /api/users/:id` - Update a user
-   `DELETE /api/user/:id` - Cancel a user
-   `GET /api/rooms` - Retrieve all rooms
-   `POST /api/rooms` - Create a new room
-   `PUT /api/rooms/:id` - Update a room
-   `DELETE /api/rooms/:id` - Cancel a room


License
-------

This project is licensed under the MIT License.
