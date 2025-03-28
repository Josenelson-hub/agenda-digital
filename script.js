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

                    if(window.location.href.includes('igrejas')){
                        let link = document.createElement('a');
                        link.href = item.url;
                        div.appendChild(h2);
                        div.appendChild(p);
                        link.appendChild(div);
                        main.appendChild(link);
                    } else {
                        div.appendChild(h2);
                        div.appendChild(p);
                        main.appendChild(div);
                    }
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
                    p.textContent = item.data ? item.data + ' - ' + item.horario : item.nome + ' - ' + (item.comum ? item.comum  + ' - ' : '') +  (item.setor ? item.setor  + ' - ' : '') + (item.numero ? item.numero.replace('5512', '(12) ') : item.fixo);

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
        fetchAndDisplayData('json/mocidade.json', '.jovens', '#jovens', 'jovens');
        fetchAndDisplayData('json/mocidade.json', '.conselho', '#conselho', 'conselho');
    }

    // Reuniões
    if (window.location.href.includes('reunioes')) {
        fetchAndDisplayData('json/reunioes.json', '.RA', '#RA', 'ra');
        fetchAndDisplayData('json/reunioes.json', '.RMA', '#RMA', 'rma');
        fetchAndDisplayData('json/reunioes.json', '.RML', '#RML', 'rml');
        fetchAndDisplayData('json/reunioes.json', '.RRM', '#RRM', 'rrm');
        fetchAndDisplayData('json/reunioes.json', '.RRA', '#RRA', 'rra');
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
        fetchAndDisplayData('json/contato.json', '.fiscal', '#fiscal', 'fiscal');
    }
};

document.addEventListener('DOMContentLoaded', initEventListeners);

const openModalLink = document.getElementById('openModalLink');
const modal = document.getElementById('modal');
const submitBtn = document.getElementById('submitBtn');

if (window.location.href.includes('index')) {
    function openModal(event) {
        event.preventDefault();
        modal.style.display = 'flex';
    }
    openModalLink.addEventListener('click', openModal)
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

async function getCorrectPassword() {
    const res = await fetch('json/senha.json');
    const data = await res.json();
    return data.senha[0].senha;
}

if (window.location.href.includes('index')) {
    submitBtn.onclick = async function() {
        const password = document.getElementById('passwordInput');
        const correctPassword = await getCorrectPassword();

        if (password.value === correctPassword) {
            const aTag = document.createElement('a');
            aTag.href = 'contatos.html';
            aTag.textContent = 'Acessar';
            aTag.classList.add('custom-link');
            submitBtn.replaceWith(aTag);
        } 
        else if (password.value === ''){
            alert('Insira a senha')
        } 
        else if (password.value != correctPassword) {
            alert('Senha incorreta')
            password.value = ''
        }
        }
}