# Quizo - Quiz Making Platform

Quizo is a quiz-making platform with built-in login/signup functionality and CRUD operations for quizzes.

<details>
<summary><b>Project Setup Instructions</b></summary>

These instructions will guide you through setting up and running Quizo locally.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager
*   [PostgreSQL](https://www.postgresql.org/) database

### Installation

1.  **Clone the repository:**

    ```
    git clone https://github.com/krAtOsnana/Quizo.git
    cd Quizo
    ```

2.  **Install dependencies:**

    ```
    npm install  # or yarn install
    ```

3.  **Set up the database:**

    *   Create a PostgreSQL database. You can use a tool like pgAdmin or the command line:

        ```
        CREATE DATABASE quizo;
        ```

4.  **Environment Configuration:**

    *   Create a `.env` file in the root directory of the project. Add the following environment variables, adjusting the values as necessary:

        ```
        DATABASE_URL="postgresql://user:password@host:port/quizo"
        JWT_SECRET="your-secret-jwt-key"

        # Replace user, password, host, and port with your database credentials
        # Replace your-secret-jwt-key with a strong, randomly generated secret key.
        ```

5.  **Run Prisma Migrations:**

    ```
    npx prisma migrate dev --name init
    ```

6.  **Seed the Database (Optional):**

    If you want to populate the database with some initial data, you can run the seed script:

    ```
    npx prisma db seed
    ```

7.  **Running the Application:**

    *   Start the backend server:

        ```
        npm run dev
        # or
        yarn dev
        ```

        This will typically start the server on `http://localhost:5001`.

    *   Start the frontend server:

        ```
        cd frontend
        npm start
        # or
        yarn start
        ```

        This will typically start the frontend on `http://localhost:3000`.

</details>

<details>
<summary><b>API Documentation</b></summary>

### Base URL

`http://localhost:5001/api`

### Authentication

The API uses JWT (JSON Web Tokens) for authentication. Most endpoints require a valid JWT to be included in the `Authorization` header as a Bearer token:


After successful login, the token is usually stored in a cookie. The `protectRoute` middleware in the backend handles authentication and authorization for protected routes.

### Endpoints

#### Authentication

*   **`POST /api/auth/signup`**: Register a new user.

    *   **Request Body:**

        ```
        {
            "username": "unique_username",
            "fullName": "John Doe",
            "password": "secure_password",
            "confirmPassword": "secure_password",
            "gender": "male",
            "profilePic": "url_to_profile_picture"
        }
        ```

    *   **Response (201 Created):**

        ```
        {
            "message": "User created successfully",
            "id": "new-user-id",
            "fullName": "John Doe",
            "username": "unique_username",
            "profilePic": "url_to_profile_picture"
        }
        ```

*   **`POST /api/auth/login`**: Login an existing user.

    *   **Request Body:**

        ```
        {
            "username": "your_username",
            "password": "your_password"
        }
        ```

    *   **Response (200 OK):**

        ```
        {
            "message": "Login Successfully",
            "token": "your_jwt_token"
        }
        ```

*   **`POST /api/auth/logout`**: Logout a user.

    *   **Response (200 OK):**

        ```
        {
            "message": "Logout successfully"
        }
        ```

*   **`GET /api/auth/me`**: Get the current user's profile (Requires Authentication).

    *   **Response (200 OK):**

        ```
        {
            "id": "user-id",
            "fullName": "John Doe",
            "username": "johndoe",
            "profilePic": "url_to_profile_pic"
        }
        ```

#### Quizzes

*   **`GET /api/quiz/quizzes`**: Get all quizzes for the authenticated teacher (Requires Authentication).

    *   **Response (200 OK):**

        ```
        [
            {
                "id": "quiz-id",
                "title": "Sample Quiz",
                "description": "A quiz about something",
                "teacherId": "teacher-user-id",
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z",
                "questions": [
                    {
                        // Question details...
                    }
                ]
            }
        ]
        ```

*   **`POST /api/quiz/quizzes`**: Create a new quiz (Requires Authentication).

    *   **Request Body:**

         ```
         {
             title: 'New Quiz Title',
             description: 'Quiz description',
             questions:[{
                 text:'Question text',
                 options:[{
                     text:'Option 1',
                     isCorrect:true
                 },
                 {
                     text:'Option 2',
                     isCorrect:false
                 }]
             }]
         }
         ```

     *   **Response (201 Created):**
    
       ```
       {
           id:'new-quiz-id',
           title:'New Quiz Title',
           description:'Quiz description',
           teacherId:'teacher-user-id' // Automatically populated from the authenticated user
       }
       ```

*   **`GET /api/quiz/quizzes/:id`**: Get a quiz by ID (Requires Authentication).

     *   **Response (200 OK):**
    
       ```
       {
           id:'quiz-id',
           title:'Sample Quiz',
           description:'A quiz about something',
           questions:[
               {
                   id:'question-id',
                   text:'What is the capital of France?',
                   options:[
                       { id:'option-id-1', text:'Paris', isCorrect:true },
                       { id:'option-id-2', text:'London', isCorrect:false }
                   ]
               }
           ]
       }
       ```

*   **`PUT /api/quiz/quizzes/:id`**: Update a quiz by ID (Requires Authentication).

     *   **Request Body:** 

         ```
         {
             title?: 'Updated Quiz Title',
             description?: 'Updated quiz description'
         }
         ```

     *   **Response (200 OK):**

         ```
         {
             message:'Quiz updated successfully'
         }
         ```

*   **`DELETE /api/quiz/quizzes/:id`**: Delete a quiz by ID (Requires Authentication).

     *   **Response (200 OK):**

         ```
         {
             message:'Quiz deleted successfully'
         }
         ```

#### Questions

*   **`POST /api/quiz/quizzes/:quizId/questions`**: Add a new question to a quiz (Requires Authentication).

     *   **Request Body:** 

       ```
       {
           text:"New question text",
           options:[
               {text:"Option 1", isCorrect:true},
               {text:"Option 2", isCorrect:false}
           ]
       }
       ```

     *   **Response (201 Created):**
    
       ```
       {
           id:"new-question-id",
           text:"New question text",
           quizId:"quiz-id"
       }
       ```

*   **`DELETE /api/quiz/questions/:questionId`**: Delete a question from a quiz (Requires Authentication).

     *   **Response (200 OK):**
    
       ```
       {
           message:"Question deleted successfully"
       }
       ```

</details>

### Error Handling

The API uses standard HTTP status codes to indicate success or failure. Common error codes include:

*   `400 Bad Request`: Invalid request data. The response body might contain details about validation errors.
*   `401 Unauthorized`: Authentication failed (e.g., invalid JWT, missing JWT).
*   `403 Forbidden`: The user does not have permission to access this resource.
*   `404 Not Found`: Resource not found (e.g., quiz with given ID does not exist).
*   `500 Internal Server Error`: An unexpected error occurred on the server. Check server logs for details.
