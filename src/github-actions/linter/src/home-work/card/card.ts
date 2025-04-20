/**
 * @enum Enum con los tipos de cartas
 */
export enum Suit {
  CLUBS = 0,
  DIAMONDS = 1,
  HEARTS = 2,
  SPADES = 3,
}

/**
 * @enum Enum con los valores de las cartas
 */
export enum Value {
  ACE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  JACK = 11,
  QUEEN = 12,
  KING = 13,
}

/**
 * @class Clase para representar una carta
 */
export class Card {
  private readonly suit: Suit;
  private readonly value: Value;
  private readonly imagePath: string;

  /**
   * @constructor Crear una nueva carta
   * @param suit El palo de la carta
   * @param value El valor de la carta
   */
  constructor(suit: Suit, value: Value) {
    this.suit = suit;
    this.value = value;
    this.imagePath = this.generateImagePath();
  }

  /**
   * @brief Generar la ruta de la imagen de la carta
   * @returns La ruta de la imagen de la carta
   */
  private generateImagePath(): string {
    const suitLetters: string[] = ['C', 'D', 'H', 'S'];
    let valueString: string;
    switch (this.value) {
      case Value.ACE:
        valueString = 'A';
        break;
      case Value.JACK:
        valueString = 'J';
        break;
      case Value.QUEEN:
        valueString = 'Q';
        break;
      case Value.KING:
        valueString = 'K';
        break;
      default:
        valueString = this.value.toString();
        break;
    }
    return `../../../img/${valueString}${suitLetters[this.suit]}.png`;
  }

  /**
   * @brief Obtener el palo de la carta
   * @return El palo de la carta
   */
  public getSuit(): Suit {
    return this.suit;
  }

  /**
   * @brief Obtener el valor de la carta
   * @return El valor de la carta
   */
  public getValue(): Value {
    return this.value;
  }

  /**
   * @brief Obtener la ruta de la imagen de la carta
   * @return La ruta de la imagen de la carta
   */
  public getImagePath(): string {
    return this.imagePath;
  }

  /**
   * @brief Comparar dos cartas
   * @param card La carta a comparar
   * @return numero positivo si la carta es mayor, negativo si es menor y 0 si son iguales
   */
  public compareTo(otherCard: Card): number {
    if (this.suit !== otherCard.suit) {
      return this.suit - otherCard.suit;
    }
    // Comparar por valor
    return this.value - otherCard.value;
  }

  /**
   * @brief Obtener una representación en cadena de la carta
   * @return La representación en cadena de la carta
   */
  public toString(): string {
    const valueNames: string[] = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
    const suitNames: string[] = ["Clubs", "Diamonds", "Hearts", "Spades"];
    return `${valueNames[this.value - 1]} of ${suitNames[this.suit]}`;
  }
}