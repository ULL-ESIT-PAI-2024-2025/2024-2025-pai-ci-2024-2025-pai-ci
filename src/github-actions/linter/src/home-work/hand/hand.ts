import { Card } from '../card/card.js';

/**
 * @class Clase para representar una mano de cartas
 */
export class Hand {
  protected cards: Card[];
  protected label: string;

  /**
   * @constructor Crear una nueva mano de cartas
   * @param label La etiqueta de la mano
   */
  constructor(label: string) {
    this.cards = [];
    this.label = label;
  }

  /**
   * @brief Obtener las cartas de la mano
   * @return Las cartas de la mano
   */
  public getCards(): Card[] {
    return this.cards;
  }

  /**
   * @brief Obtener la etiqueta de la mano
   * @return La etiqueta de la mano
   */
  public getLabel(): string {
    return this.label;
  }

  /**
   * @brief Eliminar una carta de la mano y devolverla
   * @return void
   */
  public popCard(): Card | undefined {
    return this.cards.pop();
  }

  /**
   * @brief Añadir una carta a la mano
   * @param card La carta a añadir
   * @return void
   */
  public addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * @brief Coger una carta del mazo a la mano
   * @param deck El mazo de cartas
   * @param numCards El número de cartas a coger
   */
  public moveCardsToHand(deck: any, numCards: number): void {
    for (let i = 0; i < numCards; i++) {
      const card = deck.popCard();
      if (card) {
        this.addCard(card);
      }
    }
  }

  /**
   * @brief Obtener una representación en cadena de la mano
   * @return La representación en cadena de la mano
   */
  public toString(): string {
    if (this.cards.length === 0) {
      return `${this.label}: []`;
    }
    return `${this.label}: [${this.cards.map((card) => card.toString()).join(', ')}]`;
  }
}