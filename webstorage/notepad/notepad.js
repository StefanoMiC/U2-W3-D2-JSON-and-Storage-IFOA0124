// variabile per uniformare il nome della chiave di ricerca
const storageKey = "notepad-memory";

// vogliamo prendere il riferimento alla textarea
const textAreaNode = document.getElementById("text-content");

// riferimento al nodo dei bottoni
const saveBtn = document.getElementById("btn-save");
const loadBtn = document.getElementById("btn-load");
const resetBtn = document.getElementById("btn-reset");

const save = () => {
  // 1) recuperare il contenuto della textarea ✅
  const content = textAreaNode.value;
  console.log(content);
  // 2) salvare quel dato nel localStorage tramite chiave specifica ✅
  localStorage.setItem(storageKey, content);
  // 3) dare un feedback all'utente di avvenuto salvataggio✅
  alert("contenuto salvato");
};

const load = () => {
  // 1) andiamo a cercare in memoria se è presente un elemento con la stessa chiave: "notepad-memory"✅
  const memory = localStorage.getItem(storageKey);
  // 2) verifichiamo se abbiamo ottenuto il dato, in caso positivo lo inseriamo nella textarea,✅
  // in caso negativo allertiamo l'utente che non c'è ancora nulla in memoria✅
  if (memory) {
    console.log("TROVATO");
    textAreaNode.value = memory;
  } else {
    console.log("NON TROVATO");
    alert("Nessun dato salvato in precedenza");
  }
};

const reset = () => {
  const hasConfirmed = confirm("Sei sicuro di voler resettare la memoria?");
  if (hasConfirmed) {
    // 1) resettare il campo dal suo contenuto✅
    textAreaNode.value = "";
    // 2) resettare il dato nello storage✅
    localStorage.removeItem(storageKey);
    // 3) chiedere conferma prima di farlo✅
  }
};

// saveBtn.onclick = save;
saveBtn.addEventListener("click", save);
loadBtn.addEventListener("click", load);
resetBtn.addEventListener("click", reset);
