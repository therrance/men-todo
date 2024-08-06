const connectToDB = require('../utils/db');
const { ObjectId } = require('mongodb');
const TaskSchema = require('../models/task');

const createTask = async (req, res) => {
    const db = await connectToDB();
    const task = { ...TaskSchema, ...req.body };
    const result = await db.collection('tasks').insertOne(task);
    res.status(201).json(result.ops[0]);
};

module.exports = { createTask };