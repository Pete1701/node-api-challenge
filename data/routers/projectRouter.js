const express = require('express');

const Project = require("../helpers/projectModel.js");
const Action = require('../helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error finding projects' });
    });
});

router.get('/:id', (req, res) => {
  Project.get(req.params.id)
  .then((project) => {
    res.status(200).json(project);
  })
  .catch((err) => {
    res.status(500).json({ message: 'Error finding projects' });
  });
});
  
router.post('/', (req, res) => {    
    Project.insert(req.body)
    .then(project => {res.status(201).json(project);})    
    .catch(() => {
      res.status(500).json({ message: 'Error adding project to the database' })
    })
});

router.put('/:id', (req, res) => {
    Project.update(req.params.id, req.body)
      .then((project) => {
        if (project) {          
              res.status(200).json(project);
        } else {
          res.status(404).json({ message: "The project with the specified ID does not exist." });
        }
      })
      .catch((error) => {      
        console.log(error);
        res.status(500).json({
          message: "The project information could not be modified.",
        });
      });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Project.remove(id)
      .then((project) => {
        if (project) {
          res.status(200).json({ message: "project deleted" });
        } else {
          res.status(404).json({ message: "The project with the specified ID does not exist." });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "The project could not be removed" });
      });
  });

router.get('/:id/actions', (req, res) => {    
    Project.getProjectActions(req.params.id)
      .then((action) => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: "Action not found" });
        }
      })
      .catch((error) => {      
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the action",
        });
      });
});

module.exports = router;