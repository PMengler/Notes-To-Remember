const fs = require('fs');
const util = require('util');

const uuidv1 = require('uuid/v1');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class StoreNotes {
    read() {
        return readFile('./db/db.json', 'utf8');
    }

    write(note) {
        return writeFile('./db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
            // JSON.parse(notes);
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error('Please add a title and some text to your note.');
        }

        const newNote = {
            title,
            text,
            id: uuidv1(),
        };
        
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((savedNotes) => this.write(savedNotes))
        .then(() => newNote);
    }

    removeNote(id) {
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id!== id))
        .then((filteredNotes) => this.write(filteredNotes))
    }
}

module.exports = new StoreNotes();