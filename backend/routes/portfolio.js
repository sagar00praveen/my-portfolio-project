const express = require('express');
const router = express.Router();

// Example GET endpoint for portfolio
router.get('/', (req, res) => {
  res.json({
    projects: [
      { title: "Project 1", description: "Description 1" },
      { title: "Project 2", description: "Description 2" }
    ]
  });
});

module.exports = router;
