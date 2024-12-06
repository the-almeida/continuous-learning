'use strict';

const express = require('express');
const TaskRunner = require('./taskRunner.js');

const app = express();
app.use(express.json());

const PRIOR_TASKS_NOT_COMPLETED = -1;

app.post('/api/runTasks', async (req, res, next) => {
  try {
    const { taskIds } = req.body;

    // Array para armazenar as promessas
    const promises = [];

    // Envia todas as tarefas para o TaskRunner ao mesmo tempo
    for (let i = 0; i < taskIds.length; i++) {
      const taskId = taskIds[i];
      const promise = TaskRunner.runTask(taskId);
      promises.push(promise);
    }

    // Espera todas as promessas serem resolvidas
    const results = await Promise.all(promises);

    // Exibe a ordem em que as promessas foram resolvidas
    for (let i = 0; i < results.length; i++) {
      console.log(`A promise com taskId ${taskIds[i]} foi resolvida na ordem ${i}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

exports.default = app.listen(process.env.HTTP_PORT || 3000);




'use strict';

const express = require('express');
const TaskRunner = require('./taskRunner.js');

const app = express();
app.use(express.json());

const PRIOR_TASKS_NOT_COMPLETED = -1;

app.post('/api/runTasks', async (req, res, next) => {
  try {
    const { taskIds } = req.body;

    // Array para armazenar as promessas
    const promises = [];

    // Array para armazenar os resultados na ordem
    const orderedResults = Array(taskIds.length).fill(PRIOR_TASKS_NOT_COMPLETED);

    // Envia todas as tarefas para o TaskRunner ao mesmo tempo
    for (let i = 0; i < taskIds.length; i++) {
      const taskId = taskIds[i];
      const promise = TaskRunner.runTask(taskId)
        .then(result => {
          orderedResults[i] = result;
        })
        .catch(() => {
          orderedResults[i] = PRIOR_TASKS_NOT_COMPLETED;
        });

      promises.push(promise);
    }

    // Espera todas as promessas serem resolvidas
    await Promise.all(promises);

    // Exibe a ordem em que as promessas foram resolvidas
    for (let i = 0; i < orderedResults.length; i++) {
      console.log(`A promise com taskId ${taskIds[i]} foi resolvida na ordem ${i}`);
    }

    console.log('Array de resultados:', orderedResults);

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

exports.default = app.listen(process.env.HTTP_PORT || 3000);