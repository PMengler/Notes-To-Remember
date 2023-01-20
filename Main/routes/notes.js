const expressRouter = require('express').Router();
const store = require('../db/store');

// GET Route for retrieving all the notes
expressRouter.get('/notes', (req, res) => {
  store
  .getNotes()
  .then((notes) => {
    return res.json(notes);
  })
  .catch((err) => res.status(500).json(err));
});

// POST Route for a new UX/UI note
expressRouter.post('/notes', (req, res) => {
  store
  .addNote(req.body)
  .then((note) => res.json(note))
  .catch((err) => res.status(500).json(err))
});

expressRouter.delete('notes/:id', (req, res) => {
  store
  .removeNote(req.params.id)
  .then(() => res.json({ok: true}))
  .catch((err) => res.status(500).json(err));
})

module.exports = expressRouter;