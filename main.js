  "use strict";

  // Versione interattiva del progetto Biblioteca
  const readline = require("readline");
  const Biblioteca = require("./Biblioteca");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const bib = new Biblioteca("Biblioteca Interattiva");

  function ask(domanda) {
    return new Promise((resolve) => rl.question(domanda, resolve));
  }

  async function menu() {
    while (true) {
      console.log("\n===== MENU BIBLIOTECA =====");
      console.log("1. Registra libro");
      console.log("2. Presta libro");
      console.log("3. Restituisci libro");
      console.log("4. Mostra libri disponibili");
      console.log("5. Mostra libri in prestito");
      console.log("6. Mostra stato biblioteca");
      console.log("7. Mostra storico");
      console.log("8. Filtra Libro per parola chiave");
      console.log("0. Esci");

      const scelta = await ask("Scelta: ");

      try {
        switch (scelta.trim()) {
          case "1": {
            const codice = await ask("Codice: ");
            const titolo = await ask("Titolo: ");
            const autore = await ask("Autore: ");
            bib.registraLibro(codice, titolo, autore);
            break;
          }
          case "2": {
            const codice = await ask("Codice libro: ");
            const nome = await ask("Nome lettore: ");
            bib.prestaLibro(codice, nome);
            break;
          }
          case "3": {
            const codice = await ask("Codice libro: ");
            bib.restituisciLibro(codice);
            break;
          }
          case "4": {
            const libri = bib.libriDisponibili();
            libri.forEach((l) => console.log(l.toString()));
            break;
          }
          case "5": {
            const libri = bib.libriInPrestito();
            if(libri.length===0){
              console.log("Nessun Libro in Prestito!")
            }else{
                libri.forEach((l) => console.log(l.toString()));
            }
            break;
          }
          case "6":
            bib.stampaStato();
            break;
          case "7":
            bib.stampaStorico();
            break;
          case "8":
            const parola=await ask("Inserisci parola chiave: ");
            const risultati= bib.filtraLibro(parola);

            if(risultati.length===0){
              console.log("Nessun libro trovato. ")
            }else{
              console.log("\nRisultati: ");
              risultati.forEach((l) => console.log(l.toString()));
            }
            break;
          case "0":
            console.log("Arrivederci!");
            rl.close();
            return;
          default:
            console.log("Scelta non valida.");
        }
      } catch (err) {
        console.log("Errore:", err.message);
      }
    }
  }

  menu();