const program = require('commander');
const inquirer = require('inquirer');

const { getNotes, saveNotes } = require('./actions');
const Note = require('./note');

program
  .option('-p, --path <path>', 'set the path where the notes.json is located');

program
  .command('show')
  .alias('s')
  .description('show all notes')
  .action(async () => {
    const notes = await getNotes(program.path);
    console.log('\n'); // TODO improve
    for ([index, note] of notes.entries()) {
      console.log(`${++index}) ${note.text}`);
    }
    console.log('\n'); // TODO improve
  });

program
  .command('add')
  .alias('a')
  .description('add a new note')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        name: 'text',
        message: 'Enter your note:'
      }
    ]);
    const notes = await getNotes(program.path);
    notes.push(new Note(answers.text));
    saveNotes(notes, program.path);
  });

program
  .command('delete [note]')
  .alias('d')
  .description('delete a specific note or all notes')
  .action(async (note) => {
    if (note) {
      const notes = await getNotes(program.path);
      notes.splice(--note, 1);
      saveNotes(notes, program.path);
    } else {
      const answers = await inquirer.prompt([
        {
          name: 'reallyDelete',
          message: 'Really delete ALL notes forever (y/n)?'
        }
      ]);
      if (answers.reallyDelete.toLowerCase() === 'y') {
        saveNotes([], program.path);
      }
    }
  });

program.parse(process.argv);