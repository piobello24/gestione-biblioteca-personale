/**
 * @fileoverview Definizione della classe Prestito.
 * @module Prestito
 * @author Studente
 * @version 1.0.0
 */

/**
 * Rappresenta un prestito di un libro a un lettore.
 * @class
 */
class Prestito {
    /**
     * Crea un'istanza di Prestito.
     * @param {string} codiceLibo - Codice del libro prestato.
     * @param {string} nomeLettore - Nome del lettore.
     * @param {Date} [dataPrestito=new Date()] - Data in cui è avvenuto il prestito.
     */
    constructor(codiceLibo, nomeLettore, dataPrestito = new Date()) {
      /** @type {string} */
      this.codiceLibo = codiceLibo;
  
      /** @type {string} */
      this.nomeLettore = nomeLettore;
  
      /** @type {Date} */
      this.dataPrestito = dataPrestito;
  
      /**
       * Data di restituzione, null finché non restituito.
       * @type {Date|null}
       */
      this.dataRestituzione = null;
    }
  
    /**
     * Calcola il numero di giorni trascorsi dal prestito.
     * @returns {number} Numero di giorni da quando il libro è in prestito.
     */
    giorniInPrestito() {
      const fine = this.dataRestituzione || new Date();
      const diff = fine - this.dataPrestito;
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
  
    /**
     * Verifica se il prestito è in ritardo rispetto al limite indicato.
     * @param {number} [limiteGiorni=30] - Numero massimo di giorni consentiti.
     * @returns {boolean} true se il prestito supera il limite, false altrimenti.
     */
    isInRitardo(limiteGiorni = 30) {
      return !this.dataRestituzione && this.giorniInPrestito() > limiteGiorni;
    }
  
    /**
     * Restituisce una stringa descrittiva del prestito.
     * @returns {string} Dettagli del prestito.
     */
    toString() {
      const fine = this.dataRestituzione
        ? `restituito il ${this.dataRestituzione.toLocaleDateString("it-IT")}`
        : `in prestito da ${this.giorniInPrestito()} giorni`;
      return `Libro [${this.codiceLibo}] → ${this.nomeLettore} — ${fine}`;
    }
  }
  
  module.exports = Prestito;