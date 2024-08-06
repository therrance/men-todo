const connectToDB = require('../utils/db');
const { ObjectId } = require('mongodb');

/**
 * Create a new task
 */
const createTask = async (req, res) => {
    try {
        const db = await connectToDB();
        const { name, description, status = 'to-do', startDate, dueDate, doneDate, projectId } = req.body;
        const task = { name, description, status, startDate, dueDate, doneDate, projectId };
        const result = await db.collection('tasks').insertOne(task);
        res.status(201).send(result.ops[0]);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while creating the task.' + error });
    }
};

/**
 * List all tasks
 */
const listTasks = async (req, res) => {
    try {
        const db = await connectToDB();
        const tasks = await db.collection('tasks').find().toArray();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while listing tasks.' });
    }
};

/**
 * Edit a task
 */
const editTask = async (req, res) => {
    try {
        const db = await connectToDB();
        const { id } = req.params;
        const updates = req.body;

        const result = await db.collection('tasks').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updates },
            { returnOriginal: false }
        );

        if (!result.value) {
            return res.status(404).send({ error: 'Task not found.' });
        }

        res.status(200).send(result.value);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while editing the task.' });
    }
};

/**
 * Delete a task
 */
const deleteTask = async (req, res) => {
    try {
        const db = await connectToDB();
        const { id } = req.params;

        const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Task not found.' });
        }

        res.status(200).send({ message: 'Task deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the task.' });
    }
};

/**
 * Update task status
 */
const updateTaskStatus = async (req, res) => {
    try {
        const db = await connectToDB();
        const { id } = req.params;
        const { status } = req.body;

        const update = {
            status,
            doneDate: status === 'done' ? new Date() : null,
        };

        const result = await db.collection('tasks').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update },
            { returnOriginal: false }
        );

        if (!result.value) {
            return res.status(404).send({ error: 'Task not found.' });
        }

        res.status(200).send(result.value);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the task status.' });
    }
};

/**
 * Filter tasks by status
 */
const filterTasksByStatus = async (req, res) => {
    try {
        const db = await connectToDB();
        const { status } = req.params;
        const tasks = await db.collection('tasks').find({ status }).toArray();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while filtering tasks by status.' });
    }
};

/**
 * Search tasks by name
 */
const searchTasksByName = async (req, res) => {
    try {
        const db = await connectToDB();
        const { name } = req.params;
        const tasks = await db.collection('tasks').find({ name: { $regex: name, $options: 'i' } }).toArray();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while searching for tasks by name.' });
    }
};

/**
 * Sort tasks by date fields (startDate, dueDate, doneDate)
 */
const sortTasksByDate = async (req, res) => {
    try {
        const db = await connectToDB();
        const { field } = req.params;
        const validFields = ['startDate', 'dueDate', 'doneDate'];

        if (!validFields.includes(field)) {
            return res.status(400).send({ error: 'Invalid field for sorting.' });
        }

        const tasks = await db.collection('tasks').find().sort({ [field]: 1 }).toArray();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while sorting tasks by date.' });
    }
};

/**
 * Assign a task to a project
 */
const assignTaskToProject = async (req, res) => {
    try {
        const db = await connectToDB();
        const { taskId, projectId } = req.params;

        const result = await db.collection('tasks').findOneAndUpdate(
            { _id: new ObjectId(taskId) },
            { $set: { projectId } },
            { returnOriginal: false }
        );

        if (!result.value) {
            return res.status(404).send({ error: 'Task not found.' });
        }

        res.status(200).send(result.value);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while assigning the task to the project.' });
    }
};

/**
 * Filter tasks by project name
 */
const filterTasksByProject = async (req, res) => {
    try {
        const db = await connectToDB();
        const { projectName } = req.params;

        const project = await db.collection('projects').findOne({ name: projectName });

        if (!project) {
            return res.status(404).send({ error: 'Project not found.' });
        }

        const tasks = await db.collection('tasks').find({ projectId: project._id.toString() }).toArray();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while filtering tasks by project name.' });
    }
};


module.exports = {
    createTask,
    listTasks,
    editTask,
    deleteTask,
    updateTaskStatus,
    filterTasksByStatus,
    searchTasksByName,
    sortTasksByDate,
    assignTaskToProject,
    filterTasksByProject,
};