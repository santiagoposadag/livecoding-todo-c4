import { getAllNotes, postNote, deleteNote, putNote} from "./actions/actions.js";

const form: HTMLFormElement |null = 
document.querySelector('.reminders-form');

export interface noteI{
  id:number|null,
  title:string,
  reminder:string,
  date:string
}

getAllNotes().then(notes => {
  state = notes
  recreateNotes(notes);
})

let state:noteI[] = []

form?.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e:SubmitEvent){
  e.preventDefault()
  const titleInput = document.querySelector('.title-input') as HTMLInputElement;
  const reminderInput = document.querySelector('.reminder-input') as HTMLInputElement;
  if(titleInput.value&&reminderInput.value){
    const date = new Date()
    date.setHours(date.getHours() - 5)

    const newNote: noteI = {
      id: null,
      title: titleInput.value,
      reminder: reminderInput.value,
      date: date.toISOString()
    }

    postNote(newNote).then(
      response => {
        if(response.status === 200){
          state.push(newNote)

          createReminder(newNote);  
          titleInput.value = '';
          reminderInput.value = '';
        }
      }
    )
    
  }
}

function createReminder(note:noteI){
  const notesContainer = document.querySelector('.notes-container') as HTMLDivElement

  const div:HTMLDivElement = document.createElement('div');
  div.className = 'single-note-container'
  div.classList.add(`note-${note.id}`)
  
  const h2:HTMLHeadElement = document.createElement('h2');
  h2.className = `single-note-title-${note.id}`
  h2.innerText = note.title
  
  const reminderP:HTMLParagraphElement = document.createElement('p')
  reminderP.className = `single-note-reminder-${note.id}`
  reminderP.innerText = note.reminder
  
  const dateP:HTMLParagraphElement = document.createElement('p')
  dateP.className = `single-note-date-${note.id}`
  dateP.innerText = note.date

  const deleteButton:HTMLButtonElement = document.createElement('button')
  deleteButton.className = 'single-note-delete-button'
  deleteButton.innerText = 'X'
  deleteButton.addEventListener('click', ()=> handleDelete(div))

  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = 'single-note-edit-button'
  editButton.innerText = 'edit'
  editButton.addEventListener('click', ()=> hanldeEdit(note))

  div.append(h2, reminderP, dateP, deleteButton, editButton)
  notesContainer.append(div)
}

function hanldeEdit(note:noteI){
  const titleInput = document.querySelector('.title-input') as HTMLInputElement;
  const reminderInput = document.querySelector('.reminder-input') as HTMLInputElement;
  const submitButton = document.querySelector('.reminders-form-button') as HTMLButtonElement
  submitButton.classList.add('display_none')

  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = 'form-edit-button'
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', () => executeEdition(note, titleInput, reminderInput))

  const formContainer = document.querySelector('.form-container');
  formContainer?.append(editButton)
  
  titleInput.value = note.title
  reminderInput.value = note.reminder;
}

function executeEdition(note:noteI, title:HTMLInputElement, reminder:HTMLInputElement){

  const date = new Date();
  date.setHours(date.getHours() - 5)

  const noteEdited:noteI = {
    id:note.id,
    title:title.value,
    reminder:reminder.value,
    date: date.toISOString()
  }

  putNote(noteEdited).then(response => {
    if(response.status === 200){
      const newState:noteI[] = state.map(note => note.id === noteEdited.id?noteEdited:note)
      state = newState;
    
      const h2Title = document.querySelector(`.single-note-title-${note.id}`) as HTMLHeadingElement
      h2Title.innerText = noteEdited.title
      const pReminder = document.querySelector(`.single-note-reminder-${note.id}`) as HTMLParagraphElement
      pReminder.innerText = noteEdited.reminder
    
      const pDate = document.querySelector(`.single-note-date-${note.id}`) as HTMLParagraphElement
      pDate.innerText = noteEdited.date
      
      title.value = ''
      reminder.value = ''
      const submitButton = document.querySelector('.reminders-form-button') as HTMLButtonElement
      submitButton.classList.remove('display_none')
    
      const editButton = document.querySelector('.form-edit-button') as HTMLButtonElement
    
      editButton.remove()
    }
  })

  

}

function handleDelete(div:HTMLDivElement){
  const id:string = div.classList[1].split('-')[1]
  deleteNote(id).then(response => {
    if(response.status === 200){
      div.remove()
      const newSate = state.filter(note => note.id !== parseInt(id))
      state = newSate
    }
  })
}

function recreateNotes(notes:noteI[]){
  notes.forEach(note => createReminder(note))
}

