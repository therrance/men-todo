const express = require('express');
const app = express();
const taskRouter = require('./routes/taskRoutes');
const projectRouter = require('./routes/projectRoutes');

app.use(express.json());
app.use(taskRouter);
app.use(projectRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});