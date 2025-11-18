import { loadJSON } from "../data/fetchData.js";

export const fetchAndDisplayData = (url, submenuSelector, menuSelector, key) => {
    loadJSON(url).then(data => {
        const submenu = document.querySelector(submenuSelector);
        const menu = document.querySelector(menuSelector);

        if (!submenu || !menu) return;

        submenu.classList.add('init');
        menu.addEventListener('click', () => submenu.classList.toggle('init'));

        data[key].forEach(item => {
            let div = document.createElement('div');
            div.classList.add('list');

            let h2 = document.createElement('h2');
            h2.textContent = item.local ?? item.nome;

            let p = document.createElement('p');

            const cleanNumber = () => {
                return item.numero
                    ? item.numero.replace('5512', '(12) ')
                    : item.fixo;
            };

            if (window.location.href.includes('contatos')) {
                p.textContent = (item.setor || item.comum ? (item.setor || item.comum) + ' - ' : '') + cleanNumber();
            }

            if (window.location.href.includes('reunioes') || window.location.href.includes('mocidade')) {
                p.textContent = item.data + ' - ' + item.horario;
            }

            if (window.location.href.includes('contatos')) {
                let link = document.createElement('a');
                link.href = `https://wa.me/${item.numero}`;
                div.appendChild(h2);
                div.appendChild(p);
                link.appendChild(div);
                submenu.appendChild(link);
            } else {
                div.appendChild(h2);
                div.appendChild(p);
                submenu.appendChild(div);
            }
        });

    }).catch(err => console.error(err));
};
