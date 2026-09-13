/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 *
 * * Ejercicio:
 * En este ejercicio CardCollection guarda un arreglo privado de cartas y
 * expone dos formas de recorrerlo sin revelar ese arreglo: implementando
 * Symbol.iterator (para poder usar for...of directamente) y con un
 * generador adicional (getCard) como alternativa explícita.
 *
 * Se espera entender cómo el patrón Iterator separa el "cómo se recorre"
 * una colección de "cómo se almacena" internamente, de modo que el código
 * cliente solo necesita un for...of sin saber que por debajo hay un arreglo.
 */

// Clase que representa una carta de la baraja
class Card {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

// Clase que representa la colección de cartas
class CardCollection {
  private cards: Card[] = [];

  addCard(card: Card): void {
    this.cards.push(card);
  }

  // Implementación del iterador usando Symbol.iterator
  *[Symbol.iterator](): IterableIterator<Card> {
    yield* this.cards;
    // for( const card of this.cards ) {
    //   yield card;
    // }
  }

  // Implementación del iterador usando Generadores
  *getCard(): IterableIterator<Card> {
    for (const card of this.cards) {
      yield card;
    }
  }
}

// Código cliente
function main(): void {
  const deck = new CardCollection();

  // Agregar algunas cartas a la colección
  deck.addCard(new Card('As de Corazones', 1));
  deck.addCard(new Card('Rey de Corazones', 13));
  deck.addCard(new Card('Reina de Corazones', 12));
  deck.addCard(new Card('Jota de Corazones', 11));

  // Recorrer la colección en orden usando for of
  console.log('Recorriendo la colección de cartas:');
  for (const card of deck) {
    console.log(`Carta: ${card.name}, Valor: ${card.value}`);
  }
}

main();
