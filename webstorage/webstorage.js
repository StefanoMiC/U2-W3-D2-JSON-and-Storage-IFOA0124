// Le WEB Storage API nascono con la standardizzazione di HTML5, al fine di permettere allo sviluppatore di salvare in una maniera più "persistente"
// delle informazioni all'interno del browser. Questa tecnologia è utilizzata al fine di migliorare l'esperienza utente e dare un'alternativa ai soli cookies
// localStorage e sessionStorage permettono di salvare molte più informazioni rispetto ad un cookie (5mb)
// entrambi i motori salvano i dati a livello di DOMINIO (quindi le informazioni salvate sono a "compartimenti stagni")
// si differenziano in quanto localStorage salva le informazioni fino alla loro ESPLICITA ELIMINAZIONE
// (che può avvenire cancellando i dati di navigazione del browser).
// invece sessionStorage eliminerà in automatico i dati al momento della chiusura del tab o finestra.

// nonstante queste due memorie siano gestite dal browser in spazi separati, i metodi JS che si applicano per l'interazione con loro sono identici:

// .setItem("key", value) // salva una coppia chiave/valore
// .getItem("key") // legge un valore esistente, se non presente ritorna null
// .removeItem("key") // rimuove uno specifico dato
// .clear() // elimina tutti i dati per quel dominio

// !!! Ricordati che queste informazioni sono salvate in memoria e volendo anche visibili ad un utente esperto e malintenzionato.
// non utilitilizzatelo per salvare informazioni sensibili, riservate, o niente che non vogliate esporre al pubblico.

// window.localStorage.setItem("examResult", 89); // è una proprietà dell'oggetto window...
// ma anche una variabile globale!
localStorage.setItem("examResult", 89);
localStorage.setItem("userName", "Stefano");

const exRes = localStorage.getItem("examResult");
console.log(exRes);

const notExistent = localStorage.getItem("boh");
console.log("not existent", notExistent);

localStorage.removeItem("userName"); // eliminato userName aggiunto a linea 22

localStorage.clear(); // eliminati tutti gli elementi presenti nello storage per questo dominio

// localStorage e sessionStorage riescono a salvare SOLO STRINGHE!!!
// .setItem() salverà il valore convertito a stringa, a meno che... non la convertiamo noi nel modo appropriato

localStorage.setItem("person", { firstName: "Stefano" }); // in questo caso avremo [object Object] - ha utilizzato la conversione automatica tramite il metodo .toString() del prototype

// convertiamo noi l'oggetto nel modo più consono,
//per evitare la conversione automatica che non proddurrebbe un risultato utilizzabile,
// e facciamo arrivare come valore una stringa in formato JSON, molto più utile e utilizzabile
localStorage.setItem("person", JSON.stringify({ firstName: "Stefano" })); // '{ "firstName": "Stefano" }'

// per salvare dati complessi che con una conversione automatica non manterrebbero il dato utilizzabile (come per esempio per gli oggetti e gli array)
// è quasi obbligatorio l'utilizzo del metodo JSON.stringify()
// in questo modo si ottiene una corretta trasposizione del dato nella sua versione in stringa (che sia oggetto o array)

const personStr = localStorage.getItem("person"); // abbiamo ottenuto una STRINGA!!!! non l'oggetto, non ancora.
console.log(personStr.firstName); // non funziona perché è come chiedere di fare "ciao".firstName - sarà uguale ad undefined

// bisogna CONVERTIRE la STRINGA nel suo corrispettivo formato nativo.
// se era un oggetto ri-diventerà un oggetto (nuovo)
// se era un array ri-diventerà un array (nuovo)

// il metodo speculare a .stringify() è .parse()
const personObj = JSON.parse(personStr); // trasforma la stringa in notazione JSON nel corrispettivo elemento nativo (in questo caso: object)
console.log(personObj); // questo è un vero oggetto con tutte le caratteristiche e metodi che lo contraddistinguono

console.log(personObj.firstName);

// con un array è la stessa storia...
localStorage.setItem("persons", ["Luca", "Amanda", "Domenico"]);
const persons = localStorage.getItem("persons"); // è la stringa "Luca,Amanda,Domenico"
console.log(persons.split(","));

localStorage.setItem("persons2", JSON.stringify([{ firstName: "Luca" }, { firstName: "Amanda" }, { firstName: "Domenico" }]));
const persons2 = localStorage.getItem("persons2"); // [{"firstName":"Luca"},{"firstName":"Amanda"},{"firstName":"Domenico"}]
console.log(persons2);
const persons2Array = JSON.parse(persons2); // Array(3)
console.log(persons2Array);
console.log(persons2Array[1]);

// JSON.stringify() converte BENE ARRAY / OGGETTI trasformandoli nella loro forma a stringa in formato JSON
// JSON.parse() ri-converte l'elemento stringa nel corrispettivo formato NATIVO che sia ARRAY o OGGETTO
