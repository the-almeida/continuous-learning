'use strict';

const express = require('express');
const TaskRunner = require('./taskRunner.js');

const app = express();
app.use(express.json());

const PRIOR_TASKS_NOT_COMPLETED = -1;

app.post('/api/runTasks', async (req, res, next) => {
  try {
    const { taskIds } = req.body;

    if (taskIds.some(id => !TaskRunner.hasTask(id))) {
      res.status(400).send('Invalid taskIds');
      return;
    }
    
    const promises = taskIds.map(id => TaskRunner.runTask(id));
    const results = await Promise.allSettled(promises);

    const order = results.map((result, index) => {

      if (result === PRIOR_TASKS_NOT_COMPLETED) {
        return -1;
      } else {
        return index;
      }
    });

    res.status(200).json(order); 
  } catch (error) {
    next(error);
  }
});

exports.default = app.listen(process.env.HTTP_PORT || 3000);