const TaskSchema = {
    name: String,
    description: String,
    doneStatus: Boolean,
    projectId: String,
    startDate: Date,
    dueDate: Date,
    doneDate: Date,
};

module.exports = TaskSchema;