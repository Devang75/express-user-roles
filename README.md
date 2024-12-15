# Express JS Tutorial - User Roles and Permissions

## Overview
This project is an Express.js application that demonstrates how to implement user roles and permissions. It includes features such as user authentication, role-based access control, and handling CORS.

## Features
- User authentication with JWT
- Role-based access control
- CORS handling
- Error handling
- Logging

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Devang75/express-user-roles.git
    ```
2. Navigate to the project directory:
    ```bash
    cd express-user-roles
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage
1. Start the server:
    ```bash
    npm start
    ```
2. For development, you can use nodemon:
    ```bash
    npm run dev
    ```

## Project Structure
- `server.js`: Main server file
- `config/`: Configuration files for CORS, allowed origins, and roles list
- `middleware/`: Custom middleware for logging, error handling, JWT verification, and credentials
- `routes/`: Route handlers for different endpoints

## Configuration
- `config/corsOptions.js`: CORS configuration
- `config/allowedOrigins.js`: List of allowed origins for CORS
- `config/roles_list.js`: List of user roles

## Dependencies
- express
- cookie-parser
- cors
- jsonwebtoken
- bcrypt
- date-fns
- dotenv
- uuid

## Dev Dependencies
- nodemon

## Author
Devang Patil

## License
ISC
