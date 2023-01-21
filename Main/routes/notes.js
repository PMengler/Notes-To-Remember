const noteRoute = require('express').Router();
const storeJS = require('./store.js');

noteRoute.get('/notes', (req, res) => {
  storeJS
  .getNotes().then((data) => res.json(data));
});

// POST Route for a new UX/UI note
noteRoute.post('/notes', (req, res) => {
  storeJS
  .addNote(req.body).then((note) => res.json(note))
  .catch((err) => res.status(500).json(err));
});

noteRoute.delete('/notes/:id', (req, res) => {
  storeJS
  .removeNote(req.params.id).then(() => res.json({ok: true}))
  .catch((err) => res.status(500).json(err));
})

module.exports = noteRoute;