# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint allows users to register by providing their details. It creates a new user in the system.

### HTTP Method
POST

### Request Body
The request body must be in JSON format and should include the following fields:

- `username` (string, required): The desired username for the new account.
- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the account. It should be at least 6 characters long.

### Example Request
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}

### Responses

- **201 Created**: User successfully registered.
  - Example response:
  {
    "message": "User registered successfully."
  }

- **400 Bad Request**: Validation error, missing or invalid fields.
  - Example response:
  {
    "error": "Invalid input data."
  }

- **409 Conflict**: Username or email already exists.
  - Example response:
  {
    "error": "Username or email already in use."
  }

### Status Codes
- 201: Created
- 400: Bad Request
- 409: Conflict

This documentation provides a clear overview of how to use the `/users/register` endpoint, including the required data and possible responses.