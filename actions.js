const fs = require('fs');
const util = require('util');
const path = require('path');

const Note = require('./note');

const defaultNotesFile = path.join(__dirname, 'notes.json');

const getFile = (userPath) => {
  return userPath ? path.join(userPath, 'notes.json') : defaultNotesFile;
}

const getNotes = async (path) => {
  let notes = [];
  try {
    const readFile = util.promisify(fs.readFile);
    notes = JSON.parse(await readFile(getFile(path)));
    return notes.map(note => Note.from(note));
  } catch (err) {
    console.error(`Could not read '${notesFile}'`, err);
  }
  return notes;
}

const saveNotes = async (notes, path) => {
  const writeFile = util.promisify(fs.writeFile);
  writeFile(getFile(path), JSON.stringify(notes, null, 2));
}

module.exports = { getNotes, saveNotes };