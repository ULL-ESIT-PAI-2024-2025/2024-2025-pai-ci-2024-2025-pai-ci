import { Card, Value } from '../card/card.js';
import { Hand } from '../hand/hand.js';

/**
 * @enum Representar los tipos de manos de poker
 */
export enum HandRank {
  HIGH_CARD = 0,
  ONE_PAIR = 1,
  TWO_PAIR = 2,
  THREE_OF_A_KIND = 3,
  STRAIGHT = 4,
  FLUSH = 5,
  FULL_HOUSE = 6,
  FOUR_OF_A_KIND = 7,
  STRAIGHT_FLUSH = 8,
}

/**
 * @class Clase para representar una mano de poker
 * @extends Hand
 */
export class PokerHand extends Hand {
  private rank: HandRank = HandRank.HIGH_CARD;
  private rankCards: Card[] = [];

  /**
   * @constructor Crear una nueva mano de poker
   * @param label La etiqueta de la mano
   */
  constructor(label: string) {
    super(label);
  }

  /**
   * @brief Obtener el rango de la mano
   * @return El rango de la mano
   */
  public getRank(): HandRank {
    return this.rank;
  }

  /**
   * @brief Obtener las cartas de rango
   * @return Las cartas de rango
   */
  public getRankCards(): Card[] {
    return this.rankCards;
  }

  /**
   * @brief Comprobar si hay una pareja en la mano
   * @return true si hay una pareja, false en caso contrario
   */
  public hasPair(): boolean {
    const valueCounts: Record<number, number> = this.getValueCounts();
    return Object.values(valueCounts).some((count) => count === 2);
  }

  /**
   * @brief Comprobar si hay dos parejas en la mano
   * @return true si hay dos parejas, false en caso contrario
   */
  public hasTwoPair(): boolean {
    const valueCounts: Record<number, number> = this.getValueCounts();
    const pairs: number[] = Object.values(valueCounts).filter((count) => count === 2);
    return pairs.length >= 2;
  }

  /**
   * @brief Comprobar si la mano tiene 3 reyes
   * @return true si hay 3 reyes, false en caso contrario
   */
  public hasThreeOfAKind(): boolean {
    const valueCounts: Record<number, number> = this.getValueCounts();
    return Object.values(valueCounts).some((count) => count === 3);
  }

  /**
   * @brief Comprobar si hay una escalera
   * @return true si hay una escalera, false en caso contrario
   */
  public hasStraight(): boolean {
    if (this.cards.length < 5) return false;
  
    const sortedCards: Card[] = [...this.cards].sort((a, b) => a.getValue() - b.getValue());
  
    // Verificar escalera normal (corregir índice)
    let straightFound = true;
    for (let i = 1; i < sortedCards.length; i++) {
      const currentValue = sortedCards[i].getValue();
      const previousValue = sortedCards[i - 1].getValue();
      
      if (currentValue !== previousValue + 1) {
        // Permitir duplicados (ej: full house)
        if (currentValue === previousValue) continue;
        straightFound = false;
        break;
      }
    }
  
    // Si no se encontró escalera normal, verificar A-5
    return straightFound || this.hasA5Straight();
  }

  /**
   * @brief Comprobar si la mano tiene A-5 escalera (A-2-3-4-5)
   * @return true si hay A-5 escalera, false en caso contrario
   */
  public hasA5Straight(): boolean {
    const hasAce: boolean = this.cards.some((card) => card.getValue() === Value.ACE);
    const has2: boolean = this.cards.some((card) => card.getValue() === Value.TWO);
    const has3: boolean = this.cards.some((card) => card.getValue() === Value.THREE);
    const has4: boolean = this.cards.some((card) => card.getValue() === Value.FOUR);
    const has5: boolean = this.cards.some((card) => card.getValue() === Value.FIVE);

    return hasAce && has2 && has3 && has4 && has5;
  }

  /**
   * @brief Comprobar si hay un flush
   * @return true si hay un flush, false en caso contrario
   */
  public hasFlush(): boolean {
    if (this.cards.length < 5) return false;

    // Comprobar si todas las cartas tienen el mismo palo
    const suitCounts: Record<number, number> = this.getSuitCounts();
    return Object.values(suitCounts).some((count) => count >= 5);
  }

  /**
   * @brief Comprobar si hay un full house
   * @return true si hay un full house, false en caso contrario
   */
  public hasFullHouse(): boolean {
    return this.hasThreeOfAKind() && this.hasPair();
  }

  /**
   * @brief Comprobar si hay 4 reyes
   * @return true si hay 4 reyes, false en caso contrario
   */
  public hasFourOfAKind(): boolean {
    const valueCounts: Record<number, number> = this.getValueCounts();
    return Object.values(valueCounts).some((count) => count === 4);
  }

  /**
   * @brief Comprobar si hay una escalera de color
   * @return true si hay una escalera de color, false en caso contrario
   */
  public hasStraightFlush(): boolean {
    return this.hasStraight() && this.hasFlush();
  }
  
  /**
   * @brief Obtener los recuentos de cada valor de la mano
   * @return Un objeto con los recuentos de cada valor
   */
  private getValueCounts(): Record<number, number> {
    const valueCounts: Record<number, number> = {};
    for (const card of this.cards) {
      const value: number = card.getValue();
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    }
    return valueCounts;
  }

  /**
   * @brief Obtener los recuentos de cada palo de la mano
   * @return Un objeto con los recuentos de cada palo
   */
  private getSuitCounts(): Record<number, number> {
    const suitCounts: Record<number, number> = {};
    for (const card of this.cards) {
      const suit: number = card.getSuit();
      suitCounts[suit] = (suitCounts[suit] || 0) + 1;
    }
    return suitCounts;
  }

  /**
   * @brief Clasificar la mano según el rango
   * @return void
   */
  public classify(): void {
    switch (true) {
      case this.hasStraightFlush():
      this.rank = HandRank.STRAIGHT_FLUSH;
      break;
      case this.hasFourOfAKind():
      this.rank = HandRank.FOUR_OF_A_KIND;
      break;
      case this.hasFullHouse():
      this.rank = HandRank.FULL_HOUSE;
      break;
      case this.hasFlush():
      this.rank = HandRank.FLUSH;
      break;
      case this.hasStraight():
      this.rank = HandRank.STRAIGHT;
      break;
      case this.hasThreeOfAKind():
      this.rank = HandRank.THREE_OF_A_KIND;
      break;
      case this.hasTwoPair():
      this.rank = HandRank.TWO_PAIR;
      break;
      case this.hasPair():
      this.rank = HandRank.ONE_PAIR;
      break;
      default:
      this.rank = HandRank.HIGH_CARD;
      break;
    }
    this.setRankCards();
  }

  /**
   * @brief Establecer las cartas de rango
   * @return void
   */
  private setRankCards(): void {
    const valueCounts: Record<number, number> = this.getValueCounts();
    this.rankCards = [];

    // Encontrar las cartas que determinan el rango
    switch (this.rank) {
      case HandRank.FOUR_OF_A_KIND:
        this.findCardsOfCount(4);
        break;
    }
  }

  /**
   * @brief Encontrar las cartas de un determinado recuento y añadirlas a rankCards
   * @param count El recuento de cartas a encontrar
   * @return void
   */
  private findCardsOfCount(count: number): void {
    const valueCounts: Record<number, number> = this.getValueCounts();
    
    // Encontrar el valor que tiene el recuento especificado
    const values: number[] = Object.entries(valueCounts)
      .filter(([_, c]) => c === count)
      .map(([v, _]) => Number.parseInt(v))
      .sort((a, b) => b - a);
    
    // Añadir las cartas de ese valor a rankCards
    for (const value of values) {
      const cards: Card[] = this.cards.filter((card) => card.getValue() === value);
      this.rankCards.push(...cards);
    }
  }

  /**
   * @brief Comparar una mano de poker con otra
   * @param other La mano a comparar
   * @return numero positivo si la mano es mayor, negativo si es menor y 0 si son iguales
   */
  public compareTo(other: PokerHand): number {
    // Primero clasificamos ambas manos
    this.classify();
    other.classify();

    // Comparamos los rangos principales
    if (this.rank !== other.rank) {
      return this.rank - other.rank;
    }

    // Comparar las cartas de rango una por una
    const thisRankCards: Card[] = this.rankCards.sort((a, b) => b.getValue() - a.getValue());
    const otherRankCards: Card[] = other.rankCards.sort((a, b) => b.getValue() - a.getValue());

    for (let i = 0; i < Math.min(thisRankCards.length, otherRankCards.length); i++) {
      const comparison = thisRankCards[i].getValue() - otherRankCards[i].getValue();
      if (comparison !== 0) {
        return comparison;
      }
    }

    // Si todas las cartas de rango son iguales, comparar las cartas restantes
    const thisAllCards = this.cards.sort((a, b) => b.getValue() - a.getValue());
    const otherAllCards = other.cards.sort((a, b) => b.getValue() - a.getValue());

    for (let i = 0; i < Math.min(thisAllCards.length, otherAllCards.length); i++) {
      const comparison = thisAllCards[i].getValue() - otherAllCards[i].getValue();
      if (comparison !== 0) {
        return comparison;
      }
    }

    // Si todo es igual, es un empate
    return 0;
  }

  /**
   * @brief Obtener una representación en cadena del rango de la mano
   * @return La representación en cadena del rango de la mano
   */
  public getRankString(): string {
    const rankStrings: string[] = [
      'High Card',
      'One Pair',
      'Two Pair',
      'Three of a Kind',
      'Straight',
      'Flush',
      'Full House',
      'Four of a Kind',
      'Straight Flush',
    ];
    return rankStrings[this.rank];
  }
}