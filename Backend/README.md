# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint allows users to register by providing their details. It creates a new user in the system.

### HTTP Method
POST

### Request Body
The request body must be in JSON format and should include the following fields:

- `email` (string, required): The email address of the user. Must be a valid email.
- `fullname` (object, required):
  - `firstname` (string, required): First name, at least 3 characters long.
  - `lastname` (string, optional): Last name.
- `password` (string, required): The password for the account. Must be at least 5 characters long.

#### Example Request
```json
{
  "email": "john@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securepassword"
}
```

### Responses

- **201 Created**: User successfully registered.
  ```json
  {
    "token": "<jwt_token>",
    "user": { /* user object */ }
  }
  ```

- **400 Bad Request**: Validation error, missing or invalid fields.
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```

- **500 Internal Server Error**: Server error.
  ```json
  {
    "error": "Internal server error"
  }
  ```

### Status Codes
- 201: Created
- 400: Bad Request
- 500: Internal Server Error

---

## Endpoint: `/users/login`

### Description
This endpoint allows users to log in with their email and password.

### HTTP Method
POST

### Request Body
The request body must be in JSON format and should include the following fields:

- `email` (string, required): The email address of the user. Must be a valid email.
- `password` (string, required): The password for the account. Must be at least 5 characters long.

#### Example Request
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Responses

- **200 OK**: User successfully logged in.
  ```json
  {
    "token": "<jwt_token>",
    "user": { /* user object */ }
  }
  ```

- **400 Bad Request**: Validation error, missing or invalid fields.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **401 Unauthorized**: Invalid email or password.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Status Codes
- 200: OK
- 400: Bad Request
- 401: Unauthorized

This documentation provides a clear overview of how to use the `/users/register` and `/users/login` endpoints, including the required data and possible responses.