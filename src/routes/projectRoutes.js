const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');

router.post('/projects', projectController.createProject);
router.get('/projects', projectController.listProjects);
router.put('/projects/:id', projectController.editProject);
router.delete('/projects/:id', projectController.deleteProject);

router.put('/tasks/:taskId/assign/:projectId', taskController.assignTaskToProject);
router.get('/tasks/project/:projectName', taskController.filterTasksByProject);

module.exports = router;