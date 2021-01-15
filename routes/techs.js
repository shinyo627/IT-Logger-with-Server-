const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middlewares/auth');

const Tech = require('../models/Tech');

// @route       GET api/techs
// @desc        Get techs
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    // sort({date: -1}) will return recent techs first in array
    const techs = await Tech.find({}).sort({
      date: -1,
    });
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/techs
// @desc        Add a tech
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('firstName', 'First name is required').not().isEmpty(),
      check('lastName', 'Last name is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName } = req.body;

    try {
      const newTech = new Tech({
        firstName,
        lastName,
        user: req.user.id,
      });

      const tech = await newTech.save();

      res.json(tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       DELETE api/techs
// @desc        Delete a tech
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // req.params.id is individual tech id from mongoDB
    let tech = await Tech.findById(req.params.id);

    if (!tech) {
      return res.status(404).json({ msg: 'Technician not found' });
    }

    // Make sure user owns tech
    // if (tech.user.toString() != req.user.id) {
    //   return res.status(404).json({ msg: 'Not Authorized' });
    // }

    await Tech.findByIdAndRemove(req.params.id);

    // Returning updated tech
    res.json({ msg: 'Technician removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
