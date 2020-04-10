const express = require('express');

const Project = require("../helpers/projectModel.js");
const Action = require('../helpers/actionModel.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    Action.get(req.params.project_id)    
      .then((actions) => {
        console.log('@@@', req.params.id);
        if (actions) {
          res.status(200).json(actions);
        } else {
          res.status(404).json({ message: "The action with the specified ID does not exist." });
        }
      })
      .catch((error) => {      
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the action",
        });
      });
});

router.get('/', (req, res) => {
    Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error finding action' });
    });
});

router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    Action.insert({ project_id, description, notes })
    .then(actions => {res.status(201).json(actions);})    
    .catch(() => {
      res.status(500).json({ message: 'Error adding the action to project' })
    })
  });

router.put('/:id', (req, res) => {
    Action.update(req.params.id, req.body)
      .then((actions) => {
        if (actions) {          
              res.status(200).json(actions);
            } else {
          res.status(404).json({ message: "The action with the specified ID does not exist." });
        }
      })
      .catch((error) => {      
        console.log(error);
        res.status(500).json({
          message: "The action information could not be modified.",
        });
      });
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Action.remove(id)
      .then((actions) => {
        if (actions) {
          res.status(200).json({ message: "action deleted" });
        } else {
          res.status(404).json({ message: "The action with the specified ID does not exist." });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "The action could not be removed" });
      });
  });

  module.exports = router;