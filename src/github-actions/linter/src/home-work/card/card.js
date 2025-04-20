/**
 * @enum Enum con los tipos de cartas
 */
export var Suit;
(function (Suit) {
    Suit[Suit["CLUBS"] = 0] = "CLUBS";
    Suit[Suit["DIAMONDS"] = 1] = "DIAMONDS";
    Suit[Suit["HEARTS"] = 2] = "HEARTS";
    Suit[Suit["SPADES"] = 3] = "SPADES";
})(Suit || (Suit = {}));
/**
 * @enum Enum con los valores de las cartas
 */
export var Value;
(function (Value) {
    Value[Value["ACE"] = 1] = "ACE";
    Value[Value["TWO"] = 2] = "TWO";
    Value[Value["THREE"] = 3] = "THREE";
    Value[Value["FOUR"] = 4] = "FOUR";
    Value[Value["FIVE"] = 5] = "FIVE";
    Value[Value["SIX"] = 6] = "SIX";
    Value[Value["SEVEN"] = 7] = "SEVEN";
    Value[Value["EIGHT"] = 8] = "EIGHT";
    Value[Value["NINE"] = 9] = "NINE";
    Value[Value["TEN"] = 10] = "TEN";
    Value[Value["JACK"] = 11] = "JACK";
    Value[Value["QUEEN"] = 12] = "QUEEN";
    Value[Value["KING"] = 13] = "KING";
})(Value || (Value = {}));
/**
 * @class Clase para representar una carta
 */
export class Card {
    /**
     * @constructor Crear una nueva carta
     * @param suit El palo de la carta
     * @param value El valor de la carta
     */
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.imagePath = this.generateImagePath();
    }
    /**
     * @brief Generar la ruta de la imagen de la carta
     * @returns La ruta de la imagen de la carta
     */
    generateImagePath() {
        const suitLetters = ['C', 'D', 'H', 'S'];
        let valueString;
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
    getSuit() {
        return this.suit;
    }
    /**
     * @brief Obtener el valor de la carta
     * @return El valor de la carta
     */
    getValue() {
        return this.value;
    }
    /**
     * @brief Obtener la ruta de la imagen de la carta
     * @return La ruta de la imagen de la carta
     */
    getImagePath() {
        return this.imagePath;
    }
    /**
     * @brief Comparar dos cartas
     * @param card La carta a comparar
     * @return numero positivo si la carta es mayor, negativo si es menor y 0 si son iguales
     */
    compareTo(otherCard) {
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
    toString() {
        const valueNames = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
        const suitNames = ["Clubs", "Diamonds", "Hearts", "Spades"];
        return `${valueNames[this.value - 1]} of ${suitNames[this.suit]}`;
    }
}
