const form: HTMLFormElement |null = 
document.querySelector('.reminders-form');

interface noteI{
  id:number,
  title:string,
  reminder:string,
  date:string
}

form?.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e:SubmitEvent){
  e.preventDefault()
  const titleInput = document.querySelector('.title-input') as HTMLInputElement;
  const reminderInput = document.querySelector('.reminder-input') as HTMLInputElement;
  if(titleInput.value&&reminderInput.value){
    const date = new Date()
    date.setHours(date.getHours() - 5)

    const newNote: noteI = {
      id: Math.floor(Math.random() * 1000),
      title: titleInput.value,
      reminder: reminderInput.value,
      date: date.toISOString()
    }

    createReminder(newNote);  
    titleInput.value = '';
    reminderInput.value = ''
  }
}

function createReminder(note:noteI){
  const notesContainer = document.querySelector('.notes-container') as HTMLDivElement;

  const div:HTMLDivElement = document.createElement('div');
  div.className = 'single-note-container'
  div.classList.add(`note-${note.id}`)
  
  const h2:HTMLHeadElement = document.createElement('h2');
  h2.className = 'single-note-title'
  h2.innerText = note.title
  
  const reminderP:HTMLParagraphElement = document.createElement('p')
  reminderP.className = 'single-note-reminder'
  reminderP.innerText = note.reminder
  
  const dateP:HTMLParagraphElement = document.createElement('p')
  dateP.className = 'single-note-date'
  dateP.innerText = note.date

  div.append(h2, reminderP, dateP)
  notesContainer.append(div)
}