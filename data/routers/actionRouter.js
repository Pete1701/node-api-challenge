const express = require('express');

const Project = require("../helpers/projectModel.js");
const Action = require('../helpers/actionModel.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    Action.get(req.params.id)
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

// router.post('/', (req, res) => {    
//     Action.insert(req.body)
//     .then(action => {res.status(201).json(action);})    
//     .catch(() => {
//       res.status(500).json({ message: 'Error adding the action to project' })
//     })
//   });

module.exports = router;