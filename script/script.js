/**
 * ===================== PRINCIPAIS OBJETOS  =======================
 */

 const addNote = document.querySelector('#add-note');//Botão de para adicionar nota
 const closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
 const modal = document.querySelector('#modal'); //Modal para edição das notas
 const modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
 const notes = document.querySelector('#notes');//Lista divs com dados das notas
 const btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
 const btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.
 const btnEditNote = document.querySelector("#btn-edit-note");
 const btnDeleteNote = document.querySelector("#btn-delete-note");

 /**
 * ===================== EVENTOS  =======================
 */

 addNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    notes.style.display = "none";
    modal.style.display = "block";
    addNote.style.display = "none";
 });

 btnCloseNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    notes.style.display = "flex";
    modal.style.display = "none";
    addNote.style.display = "block";
    document.querySelector("#input-id").value = "";
    document.querySelector("#input-title").value = "";
    document.querySelector("#input-content").value = "";
    listNotes();
 })

 btnSaveNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    let data = {
        id: document.querySelector("#input-id").value,
        title: document.querySelector("#input-title").value,
        content: document.querySelector("#input-content").value
    }
    saveNote(data);
 });

 btnEditNote.addEventListener("click", (evt) => {

   let notes = loadNotes();

   evt.preventDefault();
   evt.preventDefault();
   modal.style.display = "block";
   modalView.style.display = "none";
   addNote.style.display = "none";

   let id = Number(document.querySelector("#input-id").value);
   let note;

   notes.forEach((item, i) => {
      if(item.id == id){
         note = item;
      }
   });

   document.querySelector("#input-id").value = id;
   document.querySelector("#input-title").value = note.title;
   document.querySelector("#input-content").value = note.content;

 });

 btnDeleteNote.addEventListener("click", (evt) => {

   evt.preventDefault();

   let notes = loadNotes();
   let id = Number(document.querySelector("#input-id").value);
   let deleteIndex;

   notes.forEach((item, index) => {
       if(item.id == id){
         deleteIndex = index;
       }
   });

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

   listNotes.forEach((item) => {

      const divCard = document.createElement("div");
      divCard.classList = "card";
      divCard.style.width = "18rem";

      const divCardBody = document.createElement("div");
      divCardBody.classList = "card-body";

      const h1 = document.createElement("h1");
      h1.innerText = item.title;

      const content = document.createElement("p");
      content.classList = "card-text";
      content.innerText = item.content;

      const displayLastTime = document.createElement("p");
      displayLastTime.classList = "card-text";
      let lastTime = new Date(item.lastTime);
      lastTime = lastTime.toLocaleDateString("PT-Br");
      displayLastTime.innerText = "Última edição: " + lastTime;

      divCardBody.appendChild(h1);
      divCardBody.appendChild(content);
      divCardBody.appendChild(displayLastTime);
      divCard.append(divCardBody);
      notes.appendChild(divCard);

      divCard.addEventListener("click", () => showNote(item));

   });
}

const showNote = (note) => {
   notes.style.display = "none";
   addNote.style.display = "none";
   modalView.style.display = "block";

   document.querySelector("#title-note").innerHTML = `<h1>${note.title}</h1>`;
   document.querySelector("#content-note").innerHTML = `<p>${note.content}</p>`;

   let lastTime = new Date(note.lastTime);
   lastTime = lastTime.toLocaleDateString("PT-Br");

   document.querySelector("#content-note").innerHTML += `<p>${lastTime}</p>`;

   document.querySelector("#input-id").value = note.id;
}

closeModal.addEventListener("click", () => {
   evt.preventDefault();
})


const closeWindow = () => {
   listNotes();
   addNote.style.display = "block";
   modalView.style.display = "none";
   notes.style.display = "flex";
}

listNotes();