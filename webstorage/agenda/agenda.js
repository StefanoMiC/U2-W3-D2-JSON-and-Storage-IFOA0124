const storageKey = "agenda-memory";

// fabbrica di oggetti di tipo AgendaEvent
class AgendaEvent {
  constructor(name, date) {
    this.name = name;
    this.date = date;
  }
}

// riferimento ai nodi dei campi input
const eventNameInput = document.getElementById("event-name");
const eventDateInput = document.getElementById("event-date");

// riferimento al bottone "salva"
const saveBtn = document.getElementById("btn-save");
const form = document.querySelector("form");

const save = e => {
  // evitiamo il ricaricamento della pagina all'invio del form
  e.preventDefault();
  // usiamo una classe chiamata AgendaEvent per creare un oggetto dotato di proprietà name e date
  const newEvent = new AgendaEvent(eventNameInput.value, eventDateInput.value);
  // abbiamo creato l'evento! è il momento di renderlo persistente:

  // localStorage.setItem(storageKey, JSON.stringify(newEvent));
  // questo funziona sì... ma sovrascrive sempre un evento precedente, di fatto se ne può avere solo uno con questa modalità.

  // GESTIAMO IL DATO NELLO STORAGE:
  // recuperiamo il dato presente nel localStorage, SE PRESENTE conterrà almeno un array di un elemento
  const savedEvents = localStorage.getItem(storageKey); // localStorage.getItem("agenda-memory")  ==> '[{"name": "...", "date": "..."}]' || null
  if (savedEvents) {
    // se siamo qui, significa che sarà verosimilmente un SECONDO INVIO, per un secondo elemento, ed è già presente un array (in foramto stringa) nel localStorage!

    // 1) convertire la stringa del dato nella versione nativa
    const savedEventsArr = JSON.parse(savedEvents);
    // 2) sull'array convertito pushamo il nuovo evento
    savedEventsArr.push(newEvent);
    // 3) ri-salvare l'array modificato
    localStorage.setItem(storageKey, JSON.stringify(savedEventsArr));
  } else {
    // volendone salvare più di uno alla volta occorrerà salvarlo dentro un array di eventi, e poi successivamente inviarlo al localStorage!
    // creo array vuoto
    const events = [];
    // inserisco l'oggetto all'interno
    events.push(newEvent);
    // stringifizzo l'array (+ oggetto interno) e lo salvo in una chiave del localStorage
    localStorage.setItem(storageKey, JSON.stringify(events));
  }
  // FINE GESTIONE STORAGE

  // SVUOTAMENTO CAMPI FORM
  // in ogni caso svuotiamo il form alla fine del processo

  // metodo 1:   form.reset();

  // metodo 2:
  eventNameInput.value = "";
  eventDateInput.value = "";

  // GESTIONE VISUALIZZAZIONE ELEMENTI NELLA PAGINA

  generateList();
  console.log(newEvent);
};

const generateList = () => {
  // questa funzione si occuperà di prelevare tutti gli eventi salvati nel localStorage
  // e generare elementi nella lista (che nasce vuota nell'HTML)
  const savedEvents = localStorage.getItem(storageKey); // localStorage.getItem("agenda-memory")  ==> '[{"name": "...", "date": "..."}]' || null
  const list = document.getElementById("events-list");

  if (savedEvents) {
    console.log("TROVATI ELEMENTI SALVATI IN PRECEDENZA");
    // convertito la stringa in array
    const savedEventsArr = JSON.parse(savedEvents);
    // svuotata la lista per everitare che si "sommino" i nuovi elementi ai vecchi
    list.innerHTML = "";

    console.log("GENERAZIONE LISTA...");
    // con la lista ormai vuota possiamo andare a creare nuovi elementi da inserirci dentro
    savedEventsArr.forEach(el => {
      const newLi = document.createElement("li");
      newLi.className = "list-group-item";
      newLi.innerText = `${new Date(el.date).toLocaleString()} — ${el.name}`;

      list.appendChild(newLi);
    });
  }
};

window.onload = () => {
  // agganciamo la funzione save all'invio del form (solo se i campi saranno soddisfatti)
  form.addEventListener("submit", save);

  generateList();
};
