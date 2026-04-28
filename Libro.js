/**
 * @fileoverview Definizione della classe Libro per la gestione della biblioteca personale.
 * @module Libro
 * @author Studente
 * @version 1.0.0
 */

/**
 * Rappresenta un libro nella biblioteca personale.
 * @class
 */
class Libro {
    /**
     * Crea un'istanza di Libro.
     * @param {string} codice - Codice identificativo univoco del libro.
     * @param {string} titolo - Titolo del libro.
     * @param {string} autore - Autore del libro.
     */
    constructor(codice, titolo, autore) {
      /** @type {string} */
      this.codice = codice;
  
      /** @type {string} */
      this.titolo = titolo;
  
      /** @type {string} */
      this.autore = autore;
  
      /**
       * Stato del libro: "disponibile" oppure "in prestito".
       * @type {string}
       */
      this.stato = "disponibile";
  
      /**
       * Informazioni sull'attuale prestito, null se disponibile.
       * @type {Prestito|null}
       */
      this.prestito = null;
    }
  
    /**
     * Verifica se il libro è disponibile per il prestito.
     * @returns {boolean} true se disponibile, false se in prestito.
     */
    isDisponibile() {
      return this.stato === "disponibile";
    }
  
    /**
     * Restituisce una rappresentazione stringa del libro.
     * @returns {string} Descrizione del libro.
     */
    toString() {
      return `[${this.codice}] "${this.titolo}" di ${this.autore} — ${this.stato}`;
    }
  }
  
  module.exports = Libro;