/**
 * @fileoverview Punto di ingresso dell'applicazione — demo delle funzionalità.
 * @module main
 * @author Studente
 * @version 2.0.0
 *
 * @example
 * // Avvio:
 * node main.js
 */

"use strict";

const Biblioteca = require("./Biblioteca");

// ─────────────────────────────────────────────
// INIZIALIZZAZIONE
// ─────────────────────────────────────────────
const bib = new Biblioteca("La Mia Biblioteca Personale");

// ─────────────────────────────────────────────
// VERSIONE 1 – BASE
// ─────────────────────────────────────────────

console.log("\n=== VERSIONE 1 – REGISTRAZIONE LIBRI ===");

bib.registraLibro("IT001", "Il Nome della Rosa", "Umberto Eco");
bib.registraLibro("IT002", "Se questo è un uomo", "Primo Levi");
bib.registraLibro("IT003", "La coscienza di Zeno", "Italo Svevo");
bib.registraLibro("IT004", "I Malavoglia", "Giovanni Verga");
bib.registraLibro("IT005", "Uno nessuno centomila", "Luigi Pirandello");

console.log("\n=== VERSIONE 1 – PRESTITI ===");

bib.prestaLibro("IT001", "Marco Rossi");
bib.prestaLibro("IT003", "Giulia Bianchi");

console.log("\n=== VERSIONE 1 – RESTITUZIONE ===");

bib.restituisciLibro("IT001");

// ─────────────────────────────────────────────
// VERSIONE 2 – AVANZATA
// ─────────────────────────────────────────────

console.log("\n=== VERSIONE 2 – DISPONIBILITÀ ===");

console.log("\nLibri disponibili:");
bib.libriDisponibili().forEach((l) => console.log("  →", l.toString()));

console.log("\nLibri in prestito:");
bib.libriInPrestito().forEach((l) => console.log("  →", l.toString()));

// Simula un prestito vecchio per test ritardi
console.log("\n=== VERSIONE 2 – GESTIONE RITARDI ===");

const dataVecchia = new Date();
dataVecchia.setDate(dataVecchia.getDate() - 45); // 45 giorni fa
bib.prestaLibro("IT002", "Luca Ferrari", dataVecchia);

const ritardi = bib.prestitiInRitardo(30);
if (ritardi.length > 0) {
  console.log(`\n⚠️  Prestiti oltre 30 giorni:`);
  ritardi.forEach((l) =>
    console.log(
      `   - "${l.titolo}" → ${l.prestito.nomeLettore} (${l.prestito.giorniInPrestito()} giorni)`
    )
  );
} else {
  console.log("Nessun prestito in ritardo.");
}

// ─────────────────────────────────────────────
// RIEPILOGO E STORICO
// ─────────────────────────────────────────────

bib.stampaStato();
bib.stampaStorico();