import { PokerController } from './poker-controller.js';
import { PokerHand } from './poker-hand.js';

/**
 * @class Clase para representar la vista del juego de poker
 */
export class PokerView {
  private controller: PokerController;
  private hand1Container: HTMLElement;
  private hand2Container: HTMLElement;
  private resultContainer: HTMLElement;

  /**
   * @constructor Crear una nueva vista de poker
   */
  constructor() {
    this.controller = new PokerController();

    // Obtener los elementos del DOM
    this.hand1Container = document.getElementById('hand1-container') as HTMLElement;
    this.hand2Container = document.getElementById('hand2-container') as HTMLElement;
    this.resultContainer = document.getElementById('result-container') as HTMLElement;

    // Añadir eventos a los botones
    const dealHand1Button = document.getElementById('deal-hand1') as HTMLElement;
    const dealHand2Button = document.getElementById('deal-hand2') as HTMLElement;
    const resetButton = document.getElementById('reset-game') as HTMLElement;

    dealHand1Button.addEventListener('click', () => this.ondealHand1());
    dealHand2Button.addEventListener('click', () => this.ondealHand2());
    resetButton.addEventListener('click', () => this.resetGame());
  }


  /**
   * @brief Repartir cartas a la mano 1 y mostrarla
   * @return void
   */
  public ondealHand1(): void {
    const hand = this.controller.dealHand1();
    this.renderHand(hand, this.hand1Container);
    this.determineWinner();
  }

  /**
   * @brief Repartir cartas a la mano 2 y mostrarla
   * @return void
   */
  public ondealHand2(): void {
    const hand = this.controller.dealHand2();
    this.renderHand(hand, this.hand2Container);
    this.determineWinner();
  }

  /**
   * @brief Reiniciar el juego
   * @return void
   */
  public resetGame(): void {
    this.controller.resetGame();
    this.hand1Container.innerHTML = '';
    this.hand2Container.innerHTML = '';
    this.resultContainer.innerHTML = '';
  }

  /**
   * @brief Renderizar una mano de poker en el contenedor especificado
   * @param hand La mano de poker a renderizar
   * @param container El contenedor donde se renderizará la mano
   * @return void
   */
  private renderHand(hand: PokerHand, container: HTMLElement): void {
    container.innerHTML = ''; // Limpiar el contenedor

    // Crear un div para el rango de la mano
    const rankDiv = document.createElement('div');
    rankDiv.className = 'hand-rank has text-centered mb-2';
    rankDiv.textContent = hand.getRankString();
    container.appendChild(rankDiv);

    // Crear un div para las cartas de la mano
    const cardsDiv = document.createElement('div');
    cardsDiv.className = 'cards-container';

    // Agregar las cartas al contenedor
    for (const card of hand.getCards()) {
      const cardImg = document.createElement('img');
      cardImg.src = card.getImagePath();
      cardImg.alt = card.toString();
      cardImg.className = 'card-image';
      cardsDiv.appendChild(cardImg);
    }

    container.appendChild(cardsDiv);
  }

  /**
   * @brief Determinar el ganador entre las dos manos y mostrar el resultado
   * @return void
   */
  public determineWinner(): void {
    // Determinar el ganador solo si las dos manos tienen cartas
    if (this.hand1Container.querySelector('.card-image') && this.hand2Container.querySelector('.card-image')) {
      const winner = this.controller.determineWinner();
      this.resultContainer.innerHTML = ''; // Limpiar el contenedor de resultados

      const resultDiv = document.createElement('div');
      resultDiv.className = 'notification is-primary has-text-centered';

      if (winner === 1) {
        resultDiv.textContent = '¡La mano 1 gana!';
      } else if (winner === 2) {
        resultDiv.textContent = '¡La mano 2 gana!';
      } else {
        resultDiv.textContent = '¡Es un empate!';
      }

      this.resultContainer.appendChild(resultDiv);
    }
  }
}