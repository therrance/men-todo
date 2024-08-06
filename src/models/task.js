const TaskSchema = {
    name: String,
    description: String,
    status: String,
    projectId: String,
    startDate: Date,
    dueDate: Date,
    doneDate: Date,
};

module.exports = TaskSchema;