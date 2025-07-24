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

---

## Endpoint: `/users/profile`

### Description
Returns the profile of the currently authenticated user.  
**Requires authentication.** You must provide a valid JWT token in a cookie named `token` or in the `Authorization` header as `Bearer <token>`.

### HTTP Method
GET

### Request Headers
- `Cookie: token=<jwt_token>`  
  **or**
- `Authorization: Bearer <jwt_token>`

### Responses

- **200 OK**: Returns the user profile.
  ```json
  {
    "_id": "user_id",
    "email": "john@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
    // ...other user fields
  }
  ```

- **401 Unauthorized**: Token missing, invalid, or user not found.
  ```json
  {
    "message": "Unauthorized: Token not found"
  }
  ```

### Status Codes
- 200: OK
- 401: Unauthorized

---

## Endpoint: `/users/logout`

### Description
Logs out the currently authenticated user by blacklisting the token and clearing the authentication cookie.  
**Requires authentication.**

### HTTP Method
GET

### Request Headers
- `Cookie: token=<jwt_token>`  
  **or**
- `Authorization: Bearer <jwt_token>`

### Responses

- **200 OK**: Successfully logged out.
  ```json
  {
    "message": "Logged out "
  }
  ```

- **401 Unauthorized**: Token missing or invalid.
  ```json
  {
    "message": "Unauthorized: Token not found"
  }
  ```

### Status Codes
- 200: OK
- 401: Unauthorized

---

## Endpoint: `/captains/register`

### Description
This endpoint allows captains (drivers) to register by providing their personal and vehicle details.

### HTTP Method
POST

### Request Body
The request body must be in JSON format and should include the following fields:

- `email` (string, required): The email address of the captain. Must be a valid email.
- `fullname` (object, required):
  - `firstname` (string, required): First name, at least 3 characters long.
  - `lastname` (string, optional): Last name.
- `password` (string, required): The password for the account. Must be at least 3 characters long.
- `vehicle` (object, required):
  - `color` (string, required): Vehicle color, at least 3 characters long.
  - `plate` (string, required): Vehicle plate, at least 3 characters long.
  - `capacity` (integer, required): Vehicle capacity, at least 1.
  - `vehicleType` (string, required): Type of vehicle. Must be one of: `"car"`, `"motorcycle"`, `"auto"`.

#### Example Request
```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "password": "captain123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses

- **201 Created**: Captain successfully registered.
  ```json
  {
    "token": "<jwt_token>",
    "captain": { /* captain object */ }
  }
  ```

- **400 Bad Request**: Validation error, missing or invalid fields.
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 char long",
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

## Endpoint: `/captains/login`

### Description
Allows captains (drivers) to log in with their email and password.

### HTTP Method
POST

### Request Body
The request body must be in JSON format and should include:

- `email` (string, required): The email address of the captain. Must be a valid email.
- `password` (string, required): The password for the account. Must be at least 3 characters long.

#### Example Request
```json
{
  "email": "captain@example.com",
  "password": "captain123"
}
```

### Responses

- **200 OK**: Captain successfully logged in.
  ```json
  {
    "token": "<jwt_token>",
    "captain": { /* captain object */ }
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

---

## Endpoint: `/captains/profile`

### Description
Returns the profile of the currently authenticated captain.  
**Requires authentication.** You must provide a valid JWT token in a cookie named `token` or in the `Authorization` header as `Bearer <token>`.

### HTTP Method
GET

### Request Headers
- `Cookie: token=<jwt_token>`  
  **or**
- `Authorization: Bearer <jwt_token>`

### Responses

- **200 OK**: Returns the captain profile.
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "email": "captain@example.com",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // ...other captain fields
    }
  }
  ```

- **401 Unauthorized**: Token missing, invalid, or captain not found.
  ```json
  {
    "message": "Unauthorized: Token not found"
  }
  ```

### Status Codes
- 200: OK
- 401: Unauthorized

---

## Endpoint: `/captains/logout`

### Description
Logs out the currently authenticated captain by blacklisting the token and clearing the authentication cookie.  
**Requires authentication.**

### HTTP Method
GET

### Request Headers
- `Cookie: token=<jwt_token>`  
  **or**
- `Authorization: Bearer <jwt_token>`

### Responses

- **200 OK**: Successfully logged out.
  ```json
  {
    "message": "Logout Successfully"
  }
  ```

- **401 Unauthorized**: Token missing or invalid.
  ```json
  {
    "message": "Unauthorized: Token not found"
  }
  ```

### Status Codes
- 200: OK
- 401: Unauthorized

---

## Endpoint: `/rides/create`

### Description
Creates a new ride request for an authenticated user.

### HTTP Method
POST

### Authentication
Requires a valid JWT token in a cookie named `token` or in the `Authorization` header as `Bearer <token>`.

### Request Body
The request body must be in JSON format and should include:

- `pickup` (string, required): The pickup address. Must be at least 3 characters long.
- `destination` (string, required): The destination address. Must be at least 3 characters long.
- `vehicleType` (string, required): The type of vehicle. Must be one of: `"auto"`, `"car"`, `"moto"`.

#### Example Request
```json
{
  "pickup": "Arya college kukas",
  "destination": "Wtp jaipur",
  "vehicleType": "car"
}
```

### Responses

- **201 Created**: Ride successfully created.
  ```json
  {
    "success": true,
    "message": "Ride created successfully",
    "ride": {
      "_id": "ride_id",
      "user": "user_id",
      "pickup": "Arya college kukas",
      "destination": "Wtp jaipur",
      "fare": 123.45,
      "status": "pending",
      "otp": "123456",
      // ...other ride fields
    }
  }
  ```

- **400 Bad Request**: Validation error, missing or invalid fields, or unable to calculate fare.
  ```json
  {
    "success": false,
    "message": "Could not calculate distance or duration. Please check your addresses."
  }
  ```

- **401 Unauthorized**: Token missing or invalid.
  ```json
  {
    "message": "Unauthorized: Token not found"
  }
  ```

### Status Codes
- 201: Created
- 400: Bad Request
- 401: Unauthorized

---

## Endpoint: `/maps/get-coordinates`

### Description
Returns the latitude and longitude for a given address.  
**Requires authentication.**

### HTTP Method
GET

### Query Parameters
- `address` (string, required): The address to geocode. Must be at least 3 characters long.

#### Example Request
```
GET /maps/get-coordinates?address=World Trade Park Jaipur
```

### Responses

- **200 OK**: Returns the coordinates.
  ```json
  {
    "lat": 26.8506,
    "lng": 75.8007
  }
  ```

- **400 Bad Request**: Validation error or missing/invalid address.
  ```json
  {
    "errors": [
      {
        "msg": "Address must be at least 3 characters long",
        "param": "address",
        "location": "query"
      }
    ]
  }
  ```

- **401 Unauthorized**: Token missing or invalid.
  ```json
  {
    "message": "Unauthorized: Token not found"
  }
  ```

### Status Codes
- 200: OK
- 400: Bad Request
- 401: Unauthorized

---

## Endpoint: `/maps/get-distance-time`

### Description
Returns the distance (in kilometers) and duration (in minutes) between two addresses.  
**Requires authentication.**

### HTTP Method
GET

### Query Parameters
- `origin` (string, required): The starting address. Must be at least 3 characters long.
- `destination` (string, required): The destination address. Must be at least 3 characters long.

#### Example Request
```
GET /maps/get-distance-time?origin=Arya college kukas&destination=Wtp jaipur
```

### Responses

- **200 OK**: Returns the distance and duration.
  ```json
  {
    "distanceInKm": 15.2,
    "durationInMin": 32.5
  }
  ```

- **400 Bad Request**: Validation error or missing/invalid addresses.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid value",
        "param": "origin",
        "location": "query"
      }
    ]
  }
  ```

- **401 Unauthorized**: Token missing or invalid.
  ```json
  {
    "message": "Unauthorized: Token not found"
  }
  ```

### Status Codes
- 200: OK
- 400: Bad Request
- 401: Unauthorized

---

## Endpoint: `/maps/get-suggestions`

### Description
Returns autocomplete suggestions for a partial address input using Google Places API.  
**Requires authentication.**

### HTTP Method
GET

### Query Parameters
- `input` (string, required): The partial address input. Must be at least 3 characters long.

#### Example Request
```
GET /maps/get-suggestions?input=World Trade
```

### Responses

- **200 OK**: Returns an array of address predictions.
  ```json
  [
    {
      "description": "World Trade Park, Jaipur, Rajasthan, India",
      "place_id": "ChIJw2nZQwQXbDkR0lQyQ0Q0Q0Q"
      // ...other fields
    }
    // ...more predictions
  ]
  ```

- **400 Bad Request**: Validation error or missing/invalid input.
  ```json
  {
    "message": "Query parameter 'input' is required"
  }
  ```

- **401 Unauthorized**: Token missing or invalid.
  ```json
  {
    "message": "Unauthorized: Token not found"
  }
  ```

### Status Codes
- 200: OK
- 400: Bad Request
- 401: Unauthorized

---