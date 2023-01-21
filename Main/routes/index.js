const express = require('express');

//modular router
const notesRouter = require('./notes');


//import diagnostics
const app = express();

app.use('/notes', notesRouter);

module.exports = app;