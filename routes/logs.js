const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middlewares/auth');

const Log = require('../models/Log');

// @route       GET api/logs
// @desc        Get logs
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    // sort({date: -1}) will return recent logs first in array
    // const logs = await Log.find({ user: req.user.id }).sort({
    //   date: -1,
    // });
    const logs = await Log.find({}).sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/logs/search
// @desc        Search logs
// @access      Private
router.get('/search?', auth, async (req, res) => {
  const regexp = new RegExp('^' + req.query.q.toLowerCase(), 'i');

  try {
    // message, tech name, date, attention, id
    const logs = await Log.find({
      $or: [{ message: { $regex: regexp } }, { tech: { $regex: regexp } }],
    }).sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/logs
// @desc        Add a log
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('message', 'Message is required').not().isEmpty(),
      check('tech', 'Technician name is required').not().isEmpty(),
      check('attention', 'Attention is required').isBoolean().not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { message, attention, tech, date } = req.body;

    try {
      const newLog = new Log({
        message,
        attention,
        tech,
        date,
        // assigning individual user's mongoDB id to user field in each new log
        user: req.user.id,
      });

      const log = await newLog.save();

      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/logs
// @desc        Update a log
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const { message, attention, tech, date } = req.body;

  console.log('update log api attention?', attention);
  // Build log object
  const logFields = {};
  if (message) logFields.message = message;
  if (typeof attention === 'boolean') logFields.attention = attention;
  if (tech) logFields.tech = tech;
  if (date) logFields.date = date;
  try {
    // req.params.id is individual log id from mongoDB
    let log = await Log.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ msg: 'Log not found' });
    }

    // Make sure user owns log
    if (log.user.toString() != req.user.id) {
      return res.status(404).json({ msg: 'Not Authorized' });
    }

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      // This params new: true object means if there's no log in DB then store logFields as new
      { new: true }
    );

    // Returning updated log
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/logs
// @desc        Delete a log
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // req.params.id is individual log id from mongoDB
    let log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ msg: 'Log not found' });
    }

    // Make user owns log
    // if (log.user.toString() != req.user.id) {
    //   return res.status(404).json({ msg: 'Not Authorized' });
    // }

    await Log.findByIdAndRemove(req.params.id);

    // Returning updated log
    res.json({ msg: 'Log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
