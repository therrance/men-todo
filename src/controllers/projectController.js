const connectToDB = require("../utils/db");
const { ObjectId } = require("mongodb");
const ProjectSchema = require("../models/project");
const { default: nodemon } = require("nodemon");

const createProject = async (req, res) => {
    const db = await connectToDB();
    const project = { ...ProjectSchema, ...req.body };
    const result = await db.collection("projects").insertOne(project);
    res.status(201).json(result.ops[0]);
}

module.exports = { createProject };