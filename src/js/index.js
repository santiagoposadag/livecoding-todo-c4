import { getAllNotes, postNote, deleteNote, putNote } from "./actions/actions.js";
const form = document.querySelector('.reminders-form');
getAllNotes().then(notes => {
    state = notes;
    recreateNotes(notes);
});
let state = [];
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => handleSubmit(e));
function handleSubmit(e) {
    e.preventDefault();
    const titleInput = document.querySelector('.title-input');
    const reminderInput = document.querySelector('.reminder-input');
    if (titleInput.value && reminderInput.value) {
        const date = new Date();
        date.setHours(date.getHours() - 5);
        const newNote = {
            id: null,
            title: titleInput.value,
            reminder: reminderInput.value,
            date: date.toISOString()
        };
        postNote(newNote).then(response => {
            if (response.status === 200) {
                state.push(newNote);
                createReminder(newNote);
                titleInput.value = '';
                reminderInput.value = '';
            }
        });
    }
}
function createReminder(note) {
    const notesContainer = document.querySelector('.notes-container');
    const div = document.createElement('div');
    div.className = 'single-note-container';
    div.classList.add(`note-${note.id}`);
    const h2 = document.createElement('h2');
    h2.className = `single-note-title-${note.id}`;
    h2.innerText = note.title;
    const reminderP = document.createElement('p');
    reminderP.className = `single-note-reminder-${note.id}`;
    reminderP.innerText = note.reminder;
    const dateP = document.createElement('p');
    dateP.className = `single-note-date-${note.id}`;
    dateP.innerText = note.date;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-note-delete-button';
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', () => handleDelete(div));
    const editButton = document.createElement('button');
    editButton.className = 'single-note-edit-button';
    editButton.innerText = 'edit';
    editButton.addEventListener('click', () => hanldeEdit(note));
    div.append(h2, reminderP, dateP, deleteButton, editButton);
    notesContainer.append(div);
}
function hanldeEdit(note) {
    const titleInput = document.querySelector('.title-input');
    const reminderInput = document.querySelector('.reminder-input');
    const submitButton = document.querySelector('.reminders-form-button');
    submitButton.classList.add('display_none');
    const editButton = document.createElement('button');
    editButton.className = 'form-edit-button';
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEdition(note, titleInput, reminderInput));
    const formContainer = document.querySelector('.form-container');
    formContainer === null || formContainer === void 0 ? void 0 : formContainer.append(editButton);
    titleInput.value = note.title;
    reminderInput.value = note.reminder;
}
function executeEdition(note, title, reminder) {
    const date = new Date();
    date.setHours(date.getHours() - 5);
    const noteEdited = {
        id: note.id,
        title: title.value,
        reminder: reminder.value,
        date: date.toISOString()
    };
    putNote(noteEdited).then(response => {
        if (response.status === 200) {
            const newState = state.map(note => note.id === noteEdited.id ? noteEdited : note);
            state = newState;
            const h2Title = document.querySelector(`.single-note-title-${note.id}`);
            h2Title.innerText = noteEdited.title;
            const pReminder = document.querySelector(`.single-note-reminder-${note.id}`);
            pReminder.innerText = noteEdited.reminder;
            const pDate = document.querySelector(`.single-note-date-${note.id}`);
            pDate.innerText = noteEdited.date;
            title.value = '';
            reminder.value = '';
            const submitButton = document.querySelector('.reminders-form-button');
            submitButton.classList.remove('display_none');
            const editButton = document.querySelector('.form-edit-button');
            editButton.remove();
        }
    });
}
function handleDelete(div) {
    const id = div.classList[1].split('-')[1];
    deleteNote(id).then(response => {
        if (response.status === 200) {
            div.remove();
            const newSate = state.filter(note => note.id !== parseInt(id));
            state = newSate;
        }
    });
}
function recreateNotes(notes) {
    notes.forEach(note => createReminder(note));
}
