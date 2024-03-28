/**
 * ===================== PRINCIPAIS OBJETOS  =======================
 */

const addNote = document.querySelector('#add-note');//Botão de para adicionar nota
const closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
const modal = document.querySelector('#modal'); //Modal para edição das notas
const modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
const notes = document.querySelector('#notes');//Lista divs com dados das notas
const colorInput = document.querySelector("#input-color");
const btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
const btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.
const btnEditNote = document.querySelector("#btn-edit-note");
const btnDeleteNote = document.querySelector("#btn-delete-note");
const selectTheme = document.querySelector("#select-theme");

/**
* ===================== EVENTOS  =======================
*/

addNote.addEventListener("click", (evt) => {
   evt.preventDefault();
   notes.style.display = "none";
   modal.style.display = "block";
   addNote.style.display = "none";
});

colorInput.addEventListener("input", () => {
   document.querySelector("#input-title").style.color = colorInput.value;
})

btnCloseNote.addEventListener("click", (evt) => {
   evt.preventDefault();
   notes.style.display = "flex";
   modal.style.display = "none";
   addNote.style.display = "block";
   document.querySelector("#input-id").value = "";

   let theme = localStorage.getItem("theme");
   console.log(theme);

   if(theme == "dark"){
      colorInput.value = "#FFFFFF";
      document.querySelector("#input-title").style.color = "#FFFFFF";
   }
   else if(theme == "light"){
      colorInput.value = "#000000";
      document.querySelector("#input-title").style.color = "#000000";
   }

   
   document.querySelector("#input-title").value = "";
   document.querySelector("#input-content").value = "";
   listNotes();
})

btnSaveNote.addEventListener("click", (evt) => {
   evt.preventDefault();
   let data = {
       id: document.querySelector("#input-id").value,
       title: document.querySelector("#input-title").value,
       titleColor: colorInput.value,
       content: document.querySelector("#input-content").value
   }
   saveNote(data);
});

btnEditNote.addEventListener("click", (evt) => {

  evt.preventDefault();
  evt.preventDefault();
  modal.style.display = "block";
  modalView.style.display = "none";
  addNote.style.display = "none";

  let notes = loadNotes();
  let id = Number(document.querySelector("#input-id").value);

  notes.forEach(item => {
     if(item.id == id){
      document.querySelector("#input-id").value = id;
      document.querySelector("#input-title").value = item.title;

      if(item.titleColor == "#000000" && theme == "dark"){
         document.querySelector("#input-title").style.color = item.titleColor = "#FFFFFF";
         olorInput.value = "#FFFFFF";
      }
      else if(item.titleColor == "#FFFFFF" && theme == "light"){
         document.querySelector("#input-title").style.color = item.titleColor = "#000000";
         colorInput.value = "#000000";
      }
      else{
         document.querySelector("#input-title").style.color = item.titleColor = item.titleColor;
         colorInput.value = item.titleColor;
      }

      document.querySelector("#input-content").value = item.content;
     }
  });

});

btnDeleteNote.addEventListener("click", (evt) => {

  evt.preventDefault();

  let notes = loadNotes();
  let id = Number(document.querySelector("#input-id").value);

  notes = notes.filter(element => element.id != id);

  notes = JSON.stringify(notes);

     localStorage.setItem("notes", notes);

  closeWindow();

});

 /**
* ===================== FUNÇÕES  =======================
*/

 const saveNote = (note) => {

     let notes = loadNotes();

     note.lastTime = new Date().getTime();

     if(note.id.length > 0){
        note.id = parseInt(note.id);
        notes.forEach((item, i) => {
           if(item.id == note.id){
              notes[i] = note;
           }
        });
     }
     else{
        note.id = new Date().getTime();
        document.querySelector("#input-id").value = note.id;
        notes.push(note);
     }
     
     notes = JSON.stringify(notes);

     localStorage.setItem("notes", notes);

}

const loadNotes = () => {

  let notes = localStorage.getItem("notes");

     if(!notes){
        notes = [];
     }
     else{
        notes = JSON.parse(notes);
     }

  return notes;

}

const listNotes = () => {

  let listNotes = localStorage.getItem("notes");
  listNotes = JSON.parse(listNotes);

  notes.innerHTML = "";
  let position = 0;

  listNotes.forEach((item) => {

      const colCard = document.createElement("div");
      colCard.classList = "col-lg-3 col-md-4 col-sm-6 mt-3 px-2";

     const divCard = document.createElement("div");
     divCard.classList = "card h-100";

     const divCardBody = document.createElement("div");
     divCardBody.classList = "card-body";

     const h1 = document.createElement("h1");
     h1.innerText = item.title;

     let theme = localStorage.getItem("theme");

     console.log(item.titleColor);

     if(item.titleColor == "#000000" && theme == "dark"){
      h1.style.color = "#ffffff";
     }
     else if(item.titleColor == "#ffffff" && theme == "light"){
      h1.style.color = "#000000";
     }
     else{
      h1.style.color = item.titleColor;
     }

     const content = document.createElement("p");
     content.classList = "card-text";
     content.innerText = item.content;

     const displayLastTime = document.createElement("p");
     displayLastTime.classList = "card-text";
     let lastTime = new Date(item.lastTime);
     lastTime = lastTime.toLocaleDateString("PT-Br");
     displayLastTime.innerText = "Última edição: " + lastTime;

     const divCardFooter = document.createElement("div");
     divCardFooter.classList = "card-footer";
     
     const noteBtns = document.createElement("div");

     noteBtns.classList = "note-btns";
     const leftBtn = document.createElement("i");
     leftBtn.classList = "btn btn-outline-primary bi bi-arrow-left-short";
     leftBtn.value = position;
     leftBtn.addEventListener("click", (evt) => moveLeft(evt));

     const rightBtn = document.createElement("i");
     rightBtn.classList = "btn btn-outline-primary bi bi-arrow-right-short";
     rightBtn.value = position;
     rightBtn.addEventListener("click", (evt) => moveRight(evt));
     
     noteBtns.appendChild(leftBtn);
     noteBtns.appendChild(rightBtn);
     

     divCardBody.appendChild(h1);
     divCardBody.appendChild(content);
     divCardBody.appendChild(displayLastTime);
     divCardFooter.appendChild(noteBtns);
     divCard.appendChild(divCardBody);
     divCard.appendChild(divCardFooter);
     colCard.appendChild(divCard);
     notes.appendChild(colCard);

     divCardBody.addEventListener("click", () => showNote(item));
     position++;

  });
}

const showNote = (note) => {
  notes.style.display = "none";
  addNote.style.display = "none";
  modalView.style.display = "block";

  let theme = localStorage.getItem("theme");
  let color;

  if(note.titleColor == "#000000" && theme == "dark"){
   color = "#ffffff";
  }
  else if(note.titleColor == "#ffffff" && theme == "light"){
   color = "#000000";
  }
  else{
   color = note.titleColor;
  }

  document.querySelector("#title-note").innerHTML = `<h1 style="color: ${color}">${note.title}</h1>`;
  document.querySelector("#content-note").innerHTML = `<p>${note.content}</p>`;

  let lastTime = new Date(note.lastTime);
  lastTime = lastTime.toLocaleDateString("PT-Br");

  document.querySelector("#content-note").innerHTML += `<p>${lastTime}</p>`;

  document.querySelector("#input-id").value = note.id;
}

closeModal.addEventListener("click", (evt) => {
   evt.preventDefault();
  modalView.style.display = "none";
  addNote.style.display = "block";
  notes.style.display = "flex";
  listNotes();
})


const closeWindow = () => {
  listNotes();
  addNote.style.display = "block";
  modalView.style.display = "none";
  notes.style.display = "flex";
}

const moveLeft = (evt) => {
   
   const i = evt.target.value;
   let notes = loadNotes();

   if(i != 0)
      [notes[i], notes[i-1]] = [notes[i-1], notes[i]];
     
   notes = JSON.stringify(notes);
   localStorage.setItem("notes", notes);

   notes.innerHTML = "";
   listNotes();

}

const moveRight = (evt) => {

   const i = evt.target.value;
   let notes = loadNotes();

   if(i < notes.length-1)
   [notes[i], notes[i+1]] = [notes[i+1], notes[i]];

   notes = JSON.stringify(notes);
   localStorage.setItem("notes", notes);

   notes.innerHTML = "";
   listNotes();
}

selectTheme.addEventListener("change", (evt) => {
   localStorage.setItem("theme", evt.target.value);
   loadTheme();
});

const loadTheme = () => {

   let theme = localStorage.getItem("theme");

   if(theme == "dark"){
      document.documentElement.dataset.bsTheme = "dark";
      document.querySelector("#logo").classList = "invert";
   }
   
   else if(theme == "light"){
      document.documentElement.dataset.bsTheme = "light";
      document.querySelector("#logo").classList = "";
   }

   notes.innerHTML = "";
   listNotes();
   
}

const setColor = () => {

   let theme = localStorage.getItem("theme");

   if(theme == "dark")
      colorInput.value = "#ffffff";
   
   else if(theme == "light")
      colorInput.value = "#000000";

}

setColor();
loadTheme();