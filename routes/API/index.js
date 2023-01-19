const router = require('express').Router();

const notesRoutes = require('./notes.js');
router.use('/notes', notesRoutes);




module.exports = router;