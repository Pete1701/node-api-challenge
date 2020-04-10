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
  
  
//   router.get('/:id', (req, res) => {
//     Project.getById(req.params.id)
//       .then((users) => {
//         if (users) {
//           res.status(200).json(users);
//         } else {
//           res.status(404).json({ message: "The user with the specified ID does not exist." });
//         }
//       })
//       .catch((error) => {      
//         console.log(error);
//         res.status(500).json({
//           message: "Error retrieving the user",
//         });
//       });
//   });

module.exports = router;