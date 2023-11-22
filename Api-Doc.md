
# 🚀 Documentation for Your API

Welcome to the documentation for your API. This document provides an overview of the available endpoints and their functionality.


# 🔖 RESTful endpoint

RESTful APIs allow you to perform CRUD (Create, Read, Update, and Delete) operations using the POST, GET, PUT and DELETE HTTP methods.

### View responses

- Observe the response tab for status code (200 OK), response time, and size.

```http
[
    {
    <key>: <value>,
    ...
    },
    ...
]

```

- Observe the response tab for status code (201 Created), response time, and size.

```http
[
    {
    <key>: <value>,
    ...
    },
    ...
]

```

- Observe the response tab for status code (400 Bad Request), response time, and size.

```jsson
{
    message: [
        "Username is required",
        "Username must be more than 3 characters",
        "Email is required",
        "Email already registered",
        "Email format is invalid",
        "Password is required",
        "Password must be more than 8 characters",

    ];
}
```

- Observe the response tab for status code (401 Not Authorized), response time, and size.

```js
{
  message: "Invalid Token";
}
```

- Observe the response tab for status code (403 Forbidden), response time, and size.

```js
{
  message: "Forbidden";
}
```

- Observe the response tab for status code (500 Internal server error), response time, and size.

```js
{
  message: "Internal server error";
}
```

## Welcome

- **Route:** `http://localhost:3000`
- **Method:** GET
- **Description:** This is the welcome route.

## User Registration

- **Route:** `http://localhost:3000/register`
- **Method:** POST
- **Description:** Register a new user.
- **Request :**

```http
{
    username: string,
    email: string,
    password: string
}
```

- **Response :**

```js
{
  message: `User with id has been created`;
}
```

## User Login

- **Route:** `http://localhost:3000/login`
- **Method:** POST
- **Description:** Log in with an existing user account.
- **Request :**

```http
{
    email: string,
    password: string,
}
```

- **Response :**

```http
{
    access_token: string,
    data : {
        id: integer
        username: string,
        email: string,
        password: string
    }
}
```

## Google Sign-In

- **Route:** `http://localhost:3000/google-sign-in`
- **Method:** POST
- **Description:** Sign in using Google.

## Authentication Middleware

- **Middleware:** `authentication`
- **Description:** Protects routes that require authentication.
To access the API, you need to authenticate using JSON Web Tokens (JWT). Follow these steps:

1. **Obtain JWT Token**: Send a POST request to `http://localhost:3000/login` with your credentials (username and password) to obtain a JWT token.

   - **Request :**

     ```http
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```

   - **Response :**
     ```http
     {
       "access_token": <string>
     }
     ```

2. **Include JWT Token**: Include the JWT token in the `headers` of your requests using the `access_token`.

   ```http
   access_token: your_jwt_token
   ```

## Threads

### List Threads

- **Route:** `http://localhost:3000/threads`
- **Method:** GET
- **Description:** Get a list of threads.

### Create a Thread

- **Route:** `http://localhost:3000/threads`
- **Method:** POST
- **Description:** Create a new thread. Supports image upload.

### Thread Details

- **Route:** `http://localhost:3000/threads/:id`
- **Method:** GET
- **Description:** Get details of a specific thread.
- **Request :**

```json
headers : {
    "access_token": "string"
}
```

- **Response :**

```http
{
    content: <string>,
    imageUrl: <string>,
    updatedAt: <string>,
    createdAt: <string>,
    User: {
        id: <integer>,
        username: <string>,
        email: <string>
    },
    Comments: [{
        id: <integer>,
        UserId: <integer>,
        ThreadId: <integer>,
        text: <string>,
        updatedAt: <string>,
        createdAt: <string>,
        User: {
            id: <integer>,
            username: <string>,
            email: <string>
        },
        ...,
    }]
},
```

### Post a Comment

- **Route:** `http://localhost:3000/threads/:id`
- **Method:** POST
- **Description:** Post a comment on a thread.
```http
{
    content: string,
    imageUrl: string,

}
```

```json
headers : {
    "access_token": "string"
}
```

- **Response :**

```http
{
    content: <string>,
    imageUrl: <string>,
    updatedAt: <string>,
    createdAt: <string>
}
```

### Edit a Thread

- **Route:** `http://localhost:3000/threads/:id`
- **Method:** PUT
- **Description:** Edit a thread. Requires authorization.
```http
{
    content: string,
    imageUrl: string,

}
```

```json
headers : {
    "access_token": "string"
}
```

- **Response :**

```http
{
   message: "Your thread has been updated"
}
```

### Delete a Thread

- **Route:** `http://localhost:3000/threads/:id`
- **Method:** DELETE
- **Description:** Delete a thread. Requires authorization.
- **Request :**

```json
headers : {
    "access_token": "string"
}
```

- **Response :**

```js
{
  message: "Your thread has been deleted";
}
```

### Delete a Comment

- **Route:** `http://localhost:3000/threads/:id/comment`
- **Method:** DELETE
- **Description:** Delete a comment. Requires authorization.
- **Request :**

```json
headers : {
    "access_token": "string"
}
```

- **Response :**

```js
{
  message: "Your comment has been deleted";
}
```

## File Upload

- **Middleware:** `multer` and `CloudinaryStorage`
- **Description:** Handles file upload using Cloudinary for image files.

For further details and usage, please refer to the controller functions and middleware in the code.

Please make sure to handle authentication and authorization as necessary for protected routes.
