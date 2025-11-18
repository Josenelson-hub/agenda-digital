import { renderData } from "./ui/renderData.js";
import { initEventListeners } from "./events/initEvents.js";
import { initModal } from "./ui/modal.js";
import { initServiceWorker } from "./data/serviceWorker.js";
import { initPWAInstall } from './data/pwaInstall.js';

// Páginas fixas
renderData('cultos', 'info', 'igreja', 'horario');
renderData('igrejas', 'info', 'igreja', 'endereco');

// Eventos de submenu
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    initModal();
    initServiceWorker();
    initPWAInstall()
});
