# Flood Reporting API

This is a RESTful API for reporting and managing flood incidents. The API allows users to create, read, update, and delete flood reports. It also includes user authentication and authorization.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/jonyxz/flood-api.git
    cd flood-api
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the server:

    ```bash
    node app.js
    ```

## Usage

The API can be accessed at `http://localhost:5000/api`. Use a tool like Postman to interact with the API endpoints.

## API Endpoints

### Authentication

- **POST /api/register**
    - Registers a new user.
    - Request body:
        ```json
        {
            "name": "John Doe",
            "email": "john@example.com",
            "password": "password123"
        }
        ```
    - Response:
        ```json
        {
            "message": "User registered successfully",
            "data": {
                "user": { ... },
                "token": "jwt_token"
            }
        }
        ```

- **POST /api/login**
    - Logs in a user.
    - Request body:
        ```json
        {
            "email": "john@example.com",
            "password": "password123"
        }
        ```
    - Response:
        ```json
        {
            "message": "User logged in successfully",
            "data": {
                "user": { ... },
                "token": "jwt_token"
            }
        }
        ```

### Flood Reports

- **POST /api/floods**
    - Creates a new flood report.
    - Request body:
        ```json
        {
            "location": "Location",
            "description": "Description",
            "date": "2023-01-01T00:00:00.000Z",
            "status": "active"
        }
        ```
    - Response:
        ```json
        {
            "location": "Location",
            "description": "Description",
            "date": "2023-01-01T00:00:00.000Z",
            "status": "active",
            "user": "user_id",
            "_id": "flood_id"
        }
        ```

- **GET /api/floods**
    - Retrieves all flood reports.
    - Response:
        ```json
        [
            {
                "_id": "flood_id",
                "location": "Location",
                "description": "Description",
                "date": "2023-01-01T00:00:00.000Z",
                "status": "active",
                "user": { ... }
            },
            ...
        ]
        ```

- **PUT /api/floods/:id**
    - Updates a flood report.
    - Request body:
        ```json
        {
            "location": "New Location",
            "description": "New Description",
            "date": "2023-01-02T00:00:00.000Z",
            "status": "resolved"
        }
        ```
    - Response:
        ```json
        {
            "_id": "flood_id",
            "location": "New Location",
            "description": "New Description",
            "date": "2023-01-02T00:00:00.000Z",
            "status": "resolved",
            "user": "user_id"
        }
        ```

- **DELETE /api/floods/:id**
    - Deletes a flood report.
    - Response:
        ```json
        {
            "message": "Flood report deleted successfully"
        }
        ```

## Environment Variables

- `PORT`: The port on which the server will run (default: 5000).
- `MONGO_URI`: The MongoDB connection string.
- `JWT_SECRET`: The secret key for JWT authentication.
