const express = require('express');
const router = express.Router();

// @route       GET api/logs
// @desc        Get logs
// @access      Private
router.get('/', (req, res) => {
  res.send('Get logs');
});

// @route       POST api/logs
// @desc        Add a log
// @access      Private
router.post('/', (req, res) => {
  res.send('Add a log');
});

// @route       PUT api/logs
// @desc        Update a log
// @access      Private
router.put('/', (req, res) => {
  res.send('Get logged in user');
});

// @route       DELETE api/logs
// @desc        Delete a log
// @access      Private
router.delete('/', (req, res) => {
  res.send('Get logged in user');
});

module.exports = router;
