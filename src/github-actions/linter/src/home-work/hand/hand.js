/**
 * @class Clase para representar una mano de cartas
 */
export class Hand {
    /**
     * @constructor Crear una nueva mano de cartas
     * @param label La etiqueta de la mano
     */
    constructor(label) {
        this.cards = [];
        this.label = label;
    }
    /**
     * @brief Obtener las cartas de la mano
     * @return Las cartas de la mano
     */
    getCards() {
        return this.cards;
    }
    /**
     * @brief Obtener la etiqueta de la mano
     * @return La etiqueta de la mano
     */
    getLabel() {
        return this.label;
    }
    /**
     * @brief Eliminar una carta de la mano y devolverla
     * @return void
     */
    popCard() {
        return this.cards.pop();
    }
    /**
     * @brief Añadir una carta a la mano
     * @param card La carta a añadir
     * @return void
     */
    addCard(card) {
        this.cards.push(card);
    }
    /**
     * @brief Coger una carta del mazo a la mano
     * @param deck El mazo de cartas
     * @param numCards El número de cartas a coger
     */
    moveCardsToHand(deck, numCards) {
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
    toString() {
        if (this.cards.length === 0) {
            return `${this.label}: []`;
        }
        return `${this.label}: [${this.cards.map((card) => card.toString()).join(', ')}]`;
    }
}
