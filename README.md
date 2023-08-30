# Ostello_Assignment

# User Management API Documentation

This documentation provides an overview of the User Management API, which allows you to perform basic CRUD operations on user accounts. The API is designed to manage user data securely and efficiently.

## Base URL

The base URL for the API endpoints is: `https://rnd06ykn6f.execute-api.ap-south-1.amazonaws.com/Testing1`

## Authentication

Authentication is required to access certain endpoints. Use JWT tokens for authentication.

## Endpoints

### Create a New User

**URL:** `POST /api/users`

**Description:** Create a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

**Responses:**
- `201 Created`: User created successfully
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "1a2b3c4d",
      "username": "johndoe",
      "email": "johndoe@example.com"
    }
  }
  ```
- `400 Bad Request`: Invalid input
  ```json
  {
    "error": "Username, email, and password are required."
  }
  ```

### Retrieve a User

**URL:** `GET /api/users/:id`

**Description:** Retrieve user information by ID.

**Parameters:**
- `id`: User ID

**Responses:**
- `200 OK`: User retrieved successfully
  ```json
  {
    "id": "1a2b3c4d",
    "username": "johndoe",
    "email": "johndoe@example.com"
  }
  ```
- `404 Not Found`: User not found
  ```json
  {
    "error": "User not found"
  }
  ```

### Update a User

**URL:** `PUT /api/users/:id`

**Description:** Update user information by ID.

**Parameters:**
- `id`: User ID

**Request Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

**Responses:**
- `200 OK`: User updated successfully
  ```json
  {
    "id": "1a2b3c4d",
    "username": "newusername",
    "email": "newemail@example.com"
  }
  ```
- `400 Bad Request`: Invalid input
  ```json
  {
    "error": "Invalid input"
  }
  ```
- `404 Not Found`: User not found
  ```json
  {
    "error": "User not found"
  }
  ```

### Delete a User

**URL:** `DELETE /api/users/:id`

**Description:** Delete a user by ID.

**Parameters:**
- `id`: User ID

**Responses:**
- `204 No Content`: User deleted successfully
- `404 Not Found`: User not found
  ```json
  {
    "error": "User not found"
  }
  ```

## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios, such as bad requests, not found, and internal server errors.

## Security

- User passwords are hashed before storage.
- JWT tokens are used for authentication.

## Environment Variables

Use environment variables for sensitive information like database connection details and JWT secret key.

## Database Integration

The API is integrated with a relational database (MySQL) to store user data. An ORM (Sequelize) is used for database operations.

## Deployment

The API is deployed on AWS Lambda and API Gateway.

## Documentation

API documentation is available using Swagger UI. Access the documentation at: `https://api.example.com/docs`

## Security Considerations

- Sensitive data is protected.
- Rate limiting and other security measures are implemented to prevent abuse.



The API Documentation is present at API.yaml file for consice info. Additionally follow the link:
https://app.swaggerhub.com/apis/HARSHCHAUHAN123/user-management_api/1.0 for UI version of the documentation

The architecture diagram behind the idea of the API is also given.
