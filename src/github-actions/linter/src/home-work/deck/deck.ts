import { Card, Suit, Value } from '../card/card.js';
import { Hand } from '../hand/hand.js';

/**
 * @class Clase para representar un mazo de cartas
 */
export class Deck {
  private cards: Card[];
  
  /**
   * @constructor Crear un nuevo mazo de cartas
   */
  constructor() {
    this.cards = [];
    this.initialize();
  }

  /**
   * @brief Inicializar el mazo de cartas
   * @return void
   */
  private initialize(): void {
    for (let suit: Suit = Suit.CLUBS; suit <= Suit.SPADES; suit++) {
      for (let value: Value = Value.ACE; value <= Value.KING; value++) {
        this.cards.push(new Card(suit, value));
      }
    }
  }

  /**
   * @brief Obtener las cartas del mazo
   * @return Las cartas del mazo
   */
  public getCards(): Card[] {
    return this.cards;
  }

  /**
   * @brief Eliminar una carta del mazo
   * @return La carta eliminada
   */
  public popCard(): Card | undefined {
    return this.cards.pop();
  }

  /**
   * @brief Añadir una carta al mazo
   * @param card La carta a añadir
   * @return void
   */
  public addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * @brief Barajar el mazo de cartas
   * @return void
   */
  public shuffle(): void {
    for (let i: number = this.cards.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /**
   * @brief Ordenar el mazo de cartas según el palo y el valor
   * @return void
   */
  public sort(): void {
    this.cards.sort((a: Card, b: Card) => a.compareTo(b));
  }

  /**
   * @brief Repartir las cartas según el número de manos y cartas por mano
   * @param numHands El número de manos
   * @param numCardsPorMano El número de cartas por mano
   * @return Un array de manos
   */
  public dealHands(numHands: number, numCardsPorMano: number): Hand[] {
    const hands: Hand[] = [];
    for (let i: number = 0; i < numHands; i++) {
      hands.push(new Hand(`Mano ${i + 1}`));
    }

    for (let i: number = 0; i < numCardsPorMano; i++) {
      for (let j: number = 0; j < numHands; j++) {
        const card: Card | undefined = this.popCard();
        if (card) {
          hands[j].addCard(card);
        }
      }
    }

    return hands;
  }

  /**
   * @brief Obtener una representación en cadena del mazo de cartas
   * @return La representación en cadena del mazo de cartas
   */
  public toString(): string {
    return this.cards.map((card: Card) => card.toString()).join('\n');
  }
}