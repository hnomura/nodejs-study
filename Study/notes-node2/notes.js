var fs = require('fs');

var fetchNotes = () => { 
    // Read existing notes 
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return  JSON.parse(notesString); 
    } catch (e) { 
        return [];
    }

};

var saveNotes = (notes) => { 
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    // console.log('Adding note', title , body);
    var notes = fetchNotes();
    
    // new note object (simplified of the following) 
    // var note = { 
    //     title: title,
    //     body: body
    // }
    var note = { 
        title,
        body
    };

    // check uniqueness of title 
    // simplified of the following (arrow function with only one line of code .. automatically assigned to return value)
    // var duplicatedNotes = notes.filter( (note) => { return note.title==title; })
    var duplicateNotes = notes.filter( (note) => note.title === title );
    if (duplicateNotes.length === 0 ) {
        // Add new note and save
        notes.push(note); // add to the end of array
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    // fetch notes 
    return  fetchNotes(); 
};

var getNote = (title) => {
    // fetch notes 
    var notes = fetchNotes(); 

    // filter notes having the title 
    var filteredNotes = notes.filter( (note) => note.title === title ); 

    // from empty array, this returns undefined 
    return filteredNotes[0];
};

var removeNote = (title) => {
    // fetch notes 
    var notes = fetchNotes(); 

    // filter notes, removing the one with title of argument 
    var filteredNotes = notes.filter( (note) => note.title !== title ); 

    // save updated notes 
    saveNotes(filteredNotes); 

    return notes.length !== filteredNotes.length;
};

var logNote = (note) => { 
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

// export function from module
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote,
};
