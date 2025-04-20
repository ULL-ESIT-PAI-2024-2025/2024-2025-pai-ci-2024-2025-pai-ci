import { Card } from '../card/card.js';
import { Deck } from '../deck/deck.js';
import { PokerHand } from './poker-hand.js';

/**
 * @class Clase para representar el controlador del juego de poker
 */
export class PokerController {
  private deck: Deck;
  private hand1: PokerHand;
  private hand2: PokerHand;

  /**
   * @constructor Crear un nuevo controlador de poker
   */
  constructor() {
    this.deck = new Deck();
    this.hand1 = new PokerHand('Hand 1');
    this.hand2 = new PokerHand('Hand 2');
    this.deck.shuffle();
  }

  /**
   * @brief Repartir cartas a la mano1
   * @returns La mano1
   */
  public dealHand1(): PokerHand {
    // Limpiamos la mano
    while (this.hand1.getCards().length > 0) {
      const card: Card | undefined = this.hand1.popCard();
      if (card) {
        this.deck.addCard(card);
      }
    }

    // Añadimos 5 cartas a la mano
    this.hand1.moveCardsToHand(this.deck, 5);
    this.hand1.classify();

    return this.hand1;
  }

  /**
   * @brief Repartir cartas a la mano2
   * @returns La mano2
   */
  public dealHand2(): PokerHand {
    // Limpiamos la mano
    while (this.hand2.getCards().length > 0) {
      const card: Card | undefined = this.hand2.popCard();
      if (card) {
        this.deck.addCard(card);
      }
    }

    // Añadimos 5 cartas a la mano
    this.hand2.moveCardsToHand(this.deck, 5);
    this.hand2.classify();

    return this.hand2;
  }

  /**
   * @brief Determinar el ganador entre las dos manos
   * @return numero 1 si gana la mano1, 2 si gana la mano2, 0 si hay empate
   */
  public determineWinner(): number {
    const comparisson: number = this.hand1.compareTo(this.hand2);
    if (comparisson > 0) {
      return 1; // Hand 1 wins
    } else if (comparisson < 0) {
      return 2; // Hand 2 wins
    }
    return 0; // Tie
  }

  /**
   * @brief Resetear el juego
   * @return void
   */
  public resetGame(): void {
    this.deck = new Deck();
    this.hand1 = new PokerHand('Hand 1');
    this.hand2 = new PokerHand('Hand 2');
    this.deck.shuffle();
  }
}