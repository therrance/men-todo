const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.listTasks);
router.put('/tasks/:id', taskController.editTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.patch('/tasks/:id/status', taskController.updateTaskStatus);
router.get('/tasks/status/:status', taskController.filterTasksByStatus);
router.get('/tasks/search/:name', taskController.searchTasksByName);
router.get('/tasks/sort/:field', taskController.sortTasksByDate);

module.exports = router;