import { PokerView } from "../poker/poker-view.js";
/**
 * @brief Función principal para iniciar el juego de poker
 * @return void
 */
export function main() {
    document.addEventListener("DOMContentLoaded", () => {
        new PokerView();
    });
}
main();
