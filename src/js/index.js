"use strict";
const form = document.querySelector('.reminders-form');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => handleSubmit(e));
function handleSubmit(e) {
    e.preventDefault();
    const titleInput = document.querySelector('.title-input');
    const reminderInput = document.querySelector('.reminder-input');
    if (titleInput.value && reminderInput.value) {
        const date = new Date();
        date.setHours(date.getHours() - 5);
        const newNote = {
            id: Math.floor(Math.random() * 1000),
            title: titleInput.value,
            reminder: reminderInput.value,
            date: date.toISOString()
        };
        createReminder(newNote);
        titleInput.value = '';
        reminderInput.value = '';
    }
}
function createReminder(note) {
    const notesContainer = document.querySelector('.notes-container');
    const div = document.createElement('div');
    div.className = 'single-note-container';
    div.classList.add(`note-${note.id}`);
    const h2 = document.createElement('h2');
    h2.className = 'single-note-title';
    h2.innerText = note.title;
    const reminderP = document.createElement('p');
    reminderP.className = 'single-note-reminder';
    reminderP.innerText = note.reminder;
    const dateP = document.createElement('p');
    dateP.className = 'single-note-date';
    dateP.innerText = note.date;
    div.append(h2, reminderP, dateP);
    notesContainer.append(div);
}
