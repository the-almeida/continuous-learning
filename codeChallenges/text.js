'use strict';

const express = require('express');
const TaskRunner = require('./taskRunner.js');

const app = express();
app.use(express.json());

const PRIOR_TASKS_NOT_COMPLETED = -1;

app.post('/api/runTasks', async (req, res, next) => {
  try {
    // ...
  } catch (error) {
    next(error);
  }
});

exports.default = app.listen(process.env.HTTP_PORT || 3000);