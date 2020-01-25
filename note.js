const uuid = require('uuid/v4');

class Note {
  _id = uuid();

  constructor(text) {
    this._text = text;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  static from(json) {
    return Object.assign(new Note(), json);
  }
}

module.exports = Note;