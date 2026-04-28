/**
 * @fileoverview Classe per la gestione dello storico delle operazioni.
 * @module Storico
 * @author Studente
 * @version 1.0.0
 */

/**
 * @typedef {Object} Operazione
 * @property {string} tipo - Tipo di operazione: "PRESTITO" | "RESTITUZIONE" | "AGGIUNTA".
 * @property {string} codiceLibo - Codice del libro coinvolto.
 * @property {string} [nomeLettore] - Nome del lettore (solo per prestiti/restituzioni).
 * @property {Date} data - Data e ora dell'operazione.
 * @property {string} descrizione - Descrizione leggibile dell'operazione.
 */

/**
 * Gestisce lo storico cronologico di tutte le operazioni della biblioteca.
 * @class
 */
class Storico {
  /**
   * Crea un'istanza di Storico.
   */
  constructor() {
    /**
     * Lista di tutte le operazioni registrate.
     * @type {Operazione[]}
     */
    this.operazioni = [];
  }

  /**
   * Registra una nuova operazione nello storico.
   * @param {string} tipo - Tipo di operazione.
   * @param {string} codiceLibo - Codice del libro.
   * @param {string} descrizione - Descrizione dell'operazione.
   * @param {string} [nomeLettore] - Nome del lettore, se applicabile.
   */
  registra(tipo, codiceLibo, descrizione, nomeLettore = null) {
    /** @type {Operazione} */
    const op = {
      tipo,
      codiceLibo,
      nomeLettore,
      data: new Date(),
      descrizione,
    };
    this.operazioni.push(op);
  }

  /**
   * Restituisce le ultime N operazioni registrate.
   * @param {number} [n=10] - Numero di operazioni da restituire.
   * @returns {Operazione[]} Le ultime n operazioni in ordine cronologico inverso.
   */
  ultime(n = 10) {
    return [...this.operazioni].reverse().slice(0, n);
  }

  /**
   * Filtra le operazioni per codice libro.
   * @param {string} codiceLibo - Codice del libro da cercare.
   * @returns {Operazione[]} Tutte le operazioni riguardanti quel libro.
   */
  perLibro(codiceLibo) {
    return this.operazioni.filter((op) => op.codiceLibo === codiceLibo);
  }

  /**
   * Stampa lo storico completo su console.
   * @returns {void}
   */
  stampa() {
    if (this.operazioni.length === 0) {
      console.log("Nessuna operazione registrata.");
      return;
    }
    this.operazioni.forEach((op) => {
      console.log(
        `[${op.data.toLocaleString("it-IT")}] ${op.tipo}: ${op.descrizione}`
      );
    });
  }
}

module.exports = Storico;