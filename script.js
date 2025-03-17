const url = window.location.href;
const dados = fetch('json/info.json')

// Função genérica para renderizar os dados
const renderData = (url, key, label1, label2) => {
    if (window.location.href.includes(url)) {
        let main = document.querySelector('.main');
        fetch('json/info.json')
            .then(res => res.json())
            .then(data => {
                const items = data[key];
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
                    p.textContent = item.data ? item.data + ' - ' + item.horario : item.nome + ' - ' + (item.numero ? item.numero.replace('5512', '(12) ') : item.fixo);

                    if(window.location.href.includes('contatos')){
                        let link = document.createElement('a');
                        link.href = `https://wa.me/${item.numero}`;
                            div.appendChild(h2);
                            div.appendChild(p);
                            link.appendChild(div);
                            submenu.appendChild(link)
                    } else {
                        div.appendChild(h2);
                        div.appendChild(p);
                        submenu.appendChild(div);
                    }
                });
            }
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
};

const initEventListeners = () => {
    // Reuniões de mocidade
    if (window.location.href.includes('mocidade')) {
        fetchAndDisplayData('json/mocidade.json', '.mocidade', '#mocidade', 'mocidade');
        fetchAndDisplayData('json/mocidade.json', '.jovens', '#jovens', 'mocidade');
        fetchAndDisplayData('json/mocidade.json', '.conselho', '#conselho', 'mocidade');
    }

    // Reuniões
    if (window.location.href.includes('reunioes')) {
        fetchAndDisplayData('json/reunioes.json', '.RA', '#RA', 'ra');
        fetchAndDisplayData('json/reunioes.json', '.RMA', '#RMA', 'rma');
        fetchAndDisplayData('json/reunioes.json', '.RML', '#RML', 'rml');
        fetchAndDisplayData('json/reunioes.json', '.RRM', '#RRM', 'rrm');
        fetchAndDisplayData('json/reunioes.json', '.anciaes', '#anciaes', 'anciaes');
        fetchAndDisplayData('json/reunioes.json', '.diacono', '#diacono', 'diaconos');
        fetchAndDisplayData('json/reunioes.json', '.piedade', '#piedade', 'piedade');
        fetchAndDisplayData('json/reunioes.json', '.coleta', '#coleta', 'coleta');
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

document.addEventListener('DOMContentLoaded', initEventListeners);


// Abrir o modal ao clicar no link "Contatos"
const openModalLink = document.getElementById('openModalLink'); // A referência ao link "Contatos"
const modal = document.getElementById('modal');
const submitBtn = document.getElementById('submitBtn');

// Abrir o modal ao clicar no link "Contatos"
openModalLink.onclick = function(event) {
    event.preventDefault();  // Previne o comportamento de navegação do link
    modal.style.display = 'flex';
}

// Fechar o modal clicando fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Função para obter a senha correta de forma assíncrona
async function getCorrectPassword() {
    const res = await fetch('json/senha.json');
    const data = await res.json();
    return data.senha[0].senha;
}

// Lógica do botão de envio
submitBtn.onclick = async function() {
    const password = document.getElementById('passwordInput');
    
    // Obtém a senha correta de forma assíncrona
    const correctPassword = await getCorrectPassword();
    const error = document.getElementsByClassName('error');
    // Verifica se a senha inserida é correta
    if (password.value === correctPassword) {

        const aTag = document.createElement('a');
        aTag.href = 'contatos.html';  // Define o link
        aTag.textContent = 'Acessar';  // Define o texto do link
        aTag.classList.add('custom-link');
        submitBtn.replaceWith(aTag);

    } else if (password.value === '') {
        alert('Insira a senha')
    } else {
        alert('Senha incorreta')
    }
}