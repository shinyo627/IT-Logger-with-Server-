const express = require('express');
const router = express.Router();

// @route       GET api/techs
// @desc        Get techs
// @access      Private
router.get('/', (req, res) => {
  res.send('Get techs');
});

// @route       POST api/techs
// @desc        Add a tech
// @access      Private
router.post('/', (req, res) => {
  res.send('Add a tech');
});

// @route       DELETE api/techs
// @desc        Delete a tech
// @access      Private
router.delete('/', (req, res) => {
  res.send('Get techs');
});

module.exports = router;
