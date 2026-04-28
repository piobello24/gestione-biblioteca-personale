/**
 * // Versione 2 completata: filtri disponibilità, gestione ritardi, storico operazioni
 * @fileoverview Classe principale Biblioteca — gestisce libri, prestiti e storico.
 * @module Biblioteca
 * @author Studente
 * @version 2.0.0
 */

const Libro = require("./Libro");
const Prestito = require("./Prestito");
const Storico = require("./Storico");

/**
 * Gestisce l'intera biblioteca personale: catalogo, prestiti e storico.
 * @class
 */
class Biblioteca {
  /**
   * Crea un'istanza di Biblioteca.
   * @param {string} [nome="La Mia Biblioteca"] - Nome della biblioteca.
   */
  constructor(nome = "La Mia Biblioteca") {
    /** @type {string} */
    this.nome = nome;

    /**
     * Catalogo dei libri indicizzato per codice.
     * @type {Map<string, Libro>}
     */
    this.catalogo = new Map();

    /**
     * Storico delle operazioni effettuate.
     * @type {Storico}
     */
    this.storico = new Storico();
  }

  // ─────────────────────────────────────────────
  // VERSIONE 1 – BASE
  // ─────────────────────────────────────────────

  /**
   * Registra un nuovo libro nel catalogo.
   * @param {string} codice - Codice identificativo univoco.
   * @param {string} titolo - Titolo del libro.
   * @param {string} autore - Autore del libro.
   * @throws {Error} Se il codice è già presente nel catalogo.
   * @returns {Libro} Il libro appena registrato.
   */
  registraLibro(codice, titolo, autore) {
    if (this.catalogo.has(codice)) {
      throw new Error(`Libro con codice "${codice}" già presente nel catalogo.`);
    }
    const libro = new Libro(codice, titolo, autore);
    this.catalogo.set(codice, libro);
    this.storico.registra(
      "AGGIUNTA",
      codice,
      `Aggiunto "${titolo}" di ${autore}`
    );
    console.log(`✅ Libro aggiunto: ${libro.toString()}`);
    return libro;
  }

  /**
   * Registra il prestito di un libro a un lettore.
   * @param {string} codice - Codice del libro da prestare.
   * @param {string} nomeLettore - Nome del lettore che prende in prestito.
   * @param {Date} [data=new Date()] - Data del prestito.
   * @throws {Error} Se il libro non esiste o non è disponibile.
   * @returns {Prestito} Il prestito creato.
   */
  prestaLibro(codice, nomeLettore, data = new Date()) {
    const libro = this._getLibro(codice);
    if (!libro.isDisponibile()) {
      throw new Error(
        `Il libro "${libro.titolo}" è già in prestito a ${libro.prestito.nomeLettore}.`
      );
    }
    const prestito = new Prestito(codice, nomeLettore, data);
    libro.stato = "in prestito";
    libro.prestito = prestito;
    this.storico.registra(
      "PRESTITO",
      codice,
      `"${libro.titolo}" prestato a ${nomeLettore}`,
      nomeLettore
    );
    console.log(`📖 Prestito registrato: ${prestito.toString()}`);
    return prestito;
  }

  /**
   * Registra la restituzione di un libro.
   * @param {string} codice - Codice del libro restituito.
   * @throws {Error} Se il libro non esiste o è già disponibile.
   * @returns {Prestito} Il prestito chiuso.
   */
  restituisciLibro(codice) {
    const libro = this._getLibro(codice);
    if (libro.isDisponibile()) {
      throw new Error(`Il libro "${libro.titolo}" non risulta in prestito.`);
    }
    const prestito = libro.prestito;
    prestito.dataRestituzione = new Date();
    libro.stato = "disponibile";
    libro.prestito = null;
    this.storico.registra(
      "RESTITUZIONE",
      codice,
      `"${libro.titolo}" restituito da ${prestito.nomeLettore} dopo ${prestito.giorniInPrestito()} giorni`,
      prestito.nomeLettore
    );
    console.log(`✔️  Restituzione registrata: ${prestito.toString()}`);
    return prestito;
  }

  // ─────────────────────────────────────────────
  // VERSIONE 2 – AVANZATA
  // ─────────────────────────────────────────────

  /**
   * Restituisce tutti i libri disponibili.
   * @returns {Libro[]} Lista dei libri con stato "disponibile".
   */
  libriDisponibili() {
    return [...this.catalogo.values()].filter((l) => l.isDisponibile());
  }

  /**
   * Restituisce tutti i libri attualmente in prestito.
   * @returns {Libro[]} Lista dei libri con stato "in prestito".
   */
  libriInPrestito() {
    return [...this.catalogo.values()].filter((l) => !l.isDisponibile());
  }

  /**
   * Restituisce i prestiti che superano il numero di giorni indicato.
   * @param {number} [limiteGiorni=30] - Soglia in giorni per considerare un prestito in ritardo.
   * @returns {Libro[]} Lista di libri i cui prestiti sono in ritardo.
   */
  prestitiInRitardo(limiteGiorni = 30) {
    return this.libriInPrestito().filter((l) =>
      l.prestito.isInRitardo(limiteGiorni)
    );
  }

  /**
   * Stampa un riepilogo dello stato attuale della biblioteca.
   * @returns {void}
   */
  stampaStato() {
    console.log(`\n📚 === ${this.nome} ===`);
    console.log(`Libri totali: ${this.catalogo.size}`);
    console.log(`Disponibili: ${this.libriDisponibili().length}`);
    console.log(`In prestito: ${this.libriInPrestito().length}`);

    const ritardo = this.prestitiInRitardo();
    if (ritardo.length > 0) {
      console.log(`⚠️  Prestiti in ritardo (>30 giorni): ${ritardo.length}`);
      ritardo.forEach((l) =>
        console.log(
          `   - ${l.titolo} → ${l.prestito.nomeLettore} (${l.prestito.giorniInPrestito()} giorni)`
        )
      );
    }
    console.log("─────────────────────────────────");
  }

  /**
   * Stampa lo storico completo delle operazioni.
   * @returns {void}
   */
  stampaStorico() {
    console.log("\n📋 Storico operazioni:");
    this.storico.stampa();
  }

  // ─────────────────────────────────────────────
  // METODI PRIVATI DI SUPPORTO
  // ─────────────────────────────────────────────

  /**
   * Recupera un libro dal catalogo per codice.
   * @private
   * @param {string} codice - Codice del libro.
   * @throws {Error} Se il libro non esiste.
   * @returns {Libro} Il libro trovato.
   */
  _getLibro(codice) {
    if (!this.catalogo.has(codice)) {
      throw new Error(`Nessun libro trovato con codice "${codice}".`);
    }
    return this.catalogo.get(codice);
  }
}

module.exports = Biblioteca;