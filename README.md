# Task & Project Management API

This API provides functionalities for managing tasks and projects. It allows users to create, edit, delete, and list tasks and projects. Additionally, tasks can be assigned to projects, and various filters and sorting options are available.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database used for storing tasks and projects.
- **Nodemon**: Tool for automatically restarting the Node.js server during development.

## Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running locally.

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd task-project-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run MongoDB**:
   Make sure MongoDB is running on your local machine. You can start it with:

   ```bash
   mongod
   ```

4. **Start the server**:

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`.

## API Endpoints

### Task Management

1. **Create a Task**

   - **URL**: `POST /tasks`
   - **Body**:
     ```json
     {
       "name": "Task Name",
       "description": "Task Description",
       "status": "to-do", // or "done"
       "startDate": "YYYY-MM-DDTHH:MM:SSZ",
       "dueDate": "YYYY-MM-DDTHH:MM:SSZ",
       "doneDate": "YYYY-MM-DDTHH:MM:SSZ",
       "projectId": "ProjectID" // Optional
     }
     ```

2. **List All Tasks**

   - **URL**: `GET /tasks`

3. **Edit a Task**

   - **URL**: `PUT /tasks/:id`
   - **Body**: Similar to the create task body, only fields to be updated are required.

4. **Delete a Task**

   - **URL**: `DELETE /tasks/:id`

5. **Mark a Task as To-Do/Done**

   - **URL**: `PATCH /tasks/:id/status`
   - **Body**:
     ```json
     {
       "status": "to-do" // or "done"
     }
     ```

6. **Filter Tasks by Status**

   - **URL**: `GET /tasks/status/:status`

7. **Search Tasks by Name**

   - **URL**: `GET /tasks/search/:name`

8. **Sort Tasks by Dates**
   - **URL**: `GET /tasks/sort/:field`
   - **Valid Fields**: `startDate`, `dueDate`, `doneDate`

### Project Management

1. **Create a Project**

   - **URL**: `POST /projects`
   - **Body**:
     ```json
     {
       "name": "Project Name",
       "description": "Project Description",
       "startDate": "YYYY-MM-DDTHH:MM:SSZ",
       "dueDate": "YYYY-MM-DDTHH:MM:SSZ"
     }
     ```

2. **List All Projects**

   - **URL**: `GET /projects`

3. **Edit a Project**

   - **URL**: `PUT /projects/:id`
   - **Body**: Similar to the create project body, only fields to be updated are required.

4. **Delete a Project**

   - **URL**: `DELETE /projects/:id`

5. **Assign a Task to a Project**

   - **URL**: `PUT /tasks/:taskId/assign/:projectId`

6. **Filter Tasks by Project Name**

   - **URL**: `GET /tasks/project/:projectName`

7. **Sort Projects by Dates**
   - **URL**: `GET /projects/sort/:field`
   - **Valid Fields**: `startDate`, `dueDate`

## Error Handling

- The API returns appropriate HTTP status codes and error messages.
- 404 Not Found is returned when a resource is not found.
- 400 Bad Request is returned for invalid input data.
- 500 Internal Server Error is returned for unexpected errors.

## Future Improvements

- Add user authentication and authorization.
- Implement more detailed validation for input data.
- Add pagination for listing tasks and projects.
- Enhance error handling and logging.

## License

This project is licensed under the MIT License.

## Author

- **Taras Hordiienko**: [GitHub](https://github.com/therrance)

Feel free to customize and expand this README as necessary to fit your project's specific needs and details.
