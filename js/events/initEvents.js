import { fetchAndDisplayData } from "../ui/submenu.js";

export const initEventListeners = () => {

    if (window.location.href.includes('mocidade')) {
        fetchAndDisplayData('json/mocidade.json', '.mocidade', '#mocidade', 'mocidade');
        fetchAndDisplayData('json/mocidade.json', '.jovens', '#jovens', 'jovens');
        fetchAndDisplayData('json/mocidade.json', '.conselho', '#conselho', 'conselho');
    }

    if (window.location.href.includes('reunioes')) {
        const targets = [
            ['.RA', '#RA', 'ra'],
            ['.RMA', '#RMA', 'rma'],
            ['.RML', '#RML', 'rml'],
            ['.RRM', '#RRM', 'rrm'],
            ['.RRA', '#RRA', 'rra'],
            ['.anciaes', '#anciaes', 'anciaes'],
            ['.diacono', '#diacono', 'diaconos'],
            ['.piedade', '#piedade', 'piedade'],
            ['.coleta', '#coleta', 'coleta'],
        ];

        targets.forEach(t => fetchAndDisplayData('json/reunioes.json', ...t));
    }

    if (window.location.href.includes('contatos')) {
        const targets = [
            ['.anciaes', '#anciaes', 'anciaes'],
            ['.diaconos', '#diaconos', 'diaconos'],
            ['.oficial', '#oficial', 'oficial'],
            ['.jovens', '#jovens', 'jovens'],
            ['.adm', '#adm', 'adm'],
            ['.musica', '#musica', 'musica'],
            ['.fiscal', '#fiscal', 'fiscal'],
        ];

        targets.forEach(t => fetchAndDisplayData('json/contato.json', ...t));
    }
};
