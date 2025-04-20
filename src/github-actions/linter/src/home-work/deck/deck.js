import { Card, Suit, Value } from '../card/card.js';
import { Hand } from '../hand/hand.js';
/**
 * @class Clase para representar un mazo de cartas
 */
export class Deck {
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
    initialize() {
        for (let suit = Suit.CLUBS; suit <= Suit.SPADES; suit++) {
            for (let value = Value.ACE; value <= Value.KING; value++) {
                this.cards.push(new Card(suit, value));
            }
        }
    }
    /**
     * @brief Obtener las cartas del mazo
     * @return Las cartas del mazo
     */
    getCards() {
        return this.cards;
    }
    /**
     * @brief Eliminar una carta del mazo
     * @return La carta eliminada
     */
    popCard() {
        return this.cards.pop();
    }
    /**
     * @brief Añadir una carta al mazo
     * @param card La carta a añadir
     * @return void
     */
    addCard(card) {
        this.cards.push(card);
    }
    /**
     * @brief Barajar el mazo de cartas
     * @return void
     */
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    /**
     * @brief Ordenar el mazo de cartas según el palo y el valor
     * @return void
     */
    sort() {
        this.cards.sort((a, b) => a.compareTo(b));
    }
    /**
     * @brief Repartir las cartas según el número de manos y cartas por mano
     * @param numHands El número de manos
     * @param numCardsPorMano El número de cartas por mano
     * @return Un array de manos
     */
    dealHands(numHands, numCardsPorMano) {
        const hands = [];
        for (let i = 0; i < numHands; i++) {
            hands.push(new Hand(`Mano ${i + 1}`));
        }
        for (let i = 0; i < numCardsPorMano; i++) {
            for (let j = 0; j < numHands; j++) {
                const card = this.popCard();
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
    toString() {
        return this.cards.map((card) => card.toString()).join('\n');
    }
}
