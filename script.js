const url = window.location.href;
const dados = fetch('json/info.json')

// Função genérica para renderizar os dados
const renderData = (url, key, label1, label2) => {
    if (window.location.href.includes(url)) {
        let main = document.querySelector('.main');
        fetch(dados)  // Use o arquivo correto dependendo da sua necessidade
            .then(res => res.json())
            .then(data => {
                const items = data[key]; // A chave que contém os dados a serem renderizados
                items.forEach(item => {
                    let div = document.createElement('div');
                    div.classList.add('list');

                    let h2 = document.createElement('h2');
                    h2.textContent = item[label1];

                    let p = document.createElement('p');
                    p.textContent = item[label2];

                    div.appendChild(h2);
                    div.appendChild(p);

                    main.appendChild(div);
                });
            })
            .catch(error => console.error('Erro ao carregar os dados:', error));
    }
};

// Chamando a função para 'cultos' (horários de culto)
renderData('cultos', 'info', 'igreja', 'horario');

// Chamando a função para 'igrejas' (localização das igrejas)
renderData('igrejas', 'info', 'igreja', 'endereco');

const fetchAndDisplayData = (url, submenuSelector, menuSelector, key) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const submenu = document.querySelector(submenuSelector);
            const menu = document.querySelector(menuSelector);

            if (submenu && menu) {
                submenu.classList.add('init');
                menu.addEventListener('click', () => submenu.classList.toggle('init'));

                data[key].forEach(item => {
                    let div = document.createElement('div');
                    div.classList.add('list');

                    let h2 = document.createElement('h2');
                    h2.textContent = item.local;

                    let p = document.createElement('p');
                    p.textContent = item.data ? item.data + ' - ' + item.horario : item.nome + ' - ' + (item.comum || item.setor) + ' - ' + (item.numero || item.fixo);

                    div.appendChild(h2);
                    div.appendChild(p);
                    submenu.appendChild(div);
                });
            }
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
};

const initEventListeners = () => {
    // Reuniões de Eventos
    if (window.location.href.includes('eventos')) {
        fetchAndDisplayData('json/eventos.json', '.mocidade', '#mocidade', 'mocidade');
        fetchAndDisplayData('json/eventos.json', '.jovens', '#jovens', 'mocidade'); // Pode ser ajustado conforme necessidade
        fetchAndDisplayData('json/eventos.json', '.conselho', '#conselho', 'mocidade');
    }

    // Reuniões
    if (window.location.href.includes('reunioes')) {
        fetchAndDisplayData('json/reunioes.json', '.RA', '#RA', 'ra');
        fetchAndDisplayData('json/reunioes.json', '.RMA', '#RMA', 'rma');
        fetchAndDisplayData('json/reunioes.json', '.RML', '#RML', 'rml');
        fetchAndDisplayData('json/reunioes.json', '.RRM', '#RRM', 'rrm');
        fetchAndDisplayData('json/reunioes.json', '.anciaes', '#anciaes', 'anciaes');
        fetchAndDisplayData('json/reunioes.json', '.diacono', '#diacono', 'diaconos');
        fetchAndDisplayData('json/reunioes.json', '.manutencao', '#manutencao', 'manutencao');
        fetchAndDisplayData('json/reunioes.json', '.piedade', '#piedade', 'piedade');
    }

    // Contatos
    if (window.location.href.includes('contatos')) {
        fetchAndDisplayData('json/contato.json', '.anciaes', '#anciaes', 'anciaes');
        fetchAndDisplayData('json/contato.json', '.diaconos', '#diaconos', 'diaconos');
        fetchAndDisplayData('json/contato.json', '.oficial', '#oficial', 'oficial');
        fetchAndDisplayData('json/contato.json', '.jovens', '#jovens', 'jovens');
        fetchAndDisplayData('json/contato.json', '.adm', '#adm', 'adm');
        fetchAndDisplayData('json/contato.json', '.musica', '#musica', 'musica');
    }
};

// Chama a função quando a página for carregada
document.addEventListener('DOMContentLoaded', initEventListeners);
