const connectToDB = require('../utils/db');
const { ObjectId } = require('mongodb');

/**
 * Create a new project
 */
const createProject = async (req, res) => {
    try {
        const db = await connectToDB();
        const { name, description, startDate, dueDate } = req.body;
        const project = { name, description, startDate, dueDate };
        const result = await db.collection('projects').insertOne(project);
        res.status(201).send(result.ops[0]);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while creating the project.' });
    }
};

/**
 * List all projects
 */
const listProjects = async (req, res) => {
    try {
        const db = await connectToDB();
        const projects = await db.collection('projects').find().toArray();
        res.status(200).send(projects);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while listing projects.' });
    }
};

/**
 * Edit a project
 */
const editProject = async (req, res) => {
    try {
        const db = await connectToDB();
        const { id } = req.params;
        const updates = req.body;

        const result = await db.collection('projects').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updates },
            { returnOriginal: false }
        );

        if (!result.value) {
            return res.status(404).send({ error: 'Project not found.' });
        }

        res.status(200).send(result.value);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while editing the project.' });
    }
};

/**
 * Delete a project
 */
const deleteProject = async (req, res) => {
    try {
        const db = await connectToDB();
        const { id } = req.params;

        const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Project not found.' });
        }

        res.status(200).send({ message: 'Project deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the project.' });
    }
};

module.exports = {
    createProject,
    listProjects,
    editProject,
    deleteProject,
};