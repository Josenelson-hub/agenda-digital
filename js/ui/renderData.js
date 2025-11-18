import { loadJSON } from "../data/fetchData.js";

export const renderData = (url, key, label1, label2) => {
    if (window.location.href.includes(url)) {
        let main = document.querySelector('.main');

        loadJSON('json/info.json').then(data => {
            const items = data[key];

            items.forEach(item => {

                // Criar container principal
                let div = document.createElement('div');
                div.classList.add('list');

                // Criar bloco de texto
                let contentDiv = document.createElement('div');
                let h2 = document.createElement('h2');
                h2.textContent = item[label1];

                let p = document.createElement('p');
                p.innerHTML = item[label2].replace(/--/g, '<br>');

                contentDiv.appendChild(h2);
                contentDiv.appendChild(p);

                // Se estiver na página de igrejas → montar com ícone à direita
                if (window.location.href.includes('igrejas')) {
                    
                    // Criar bloco do ícone
                    let iconDiv = document.createElement('div');
                    let icon = document.createElement('span');
                    icon.classList.add('external-icon');
                    icon.textContent = '↗';

                    iconDiv.appendChild(icon);

                    // Transformar tudo em link
                    let link = document.createElement('a');
                    link.href = item.url;

                    div.classList.add('igreja')

                    link.appendChild(div);
                    div.appendChild(contentDiv);
                    div.appendChild(iconDiv);
                    main.appendChild(link);

                } else {
                    // Caso normal (sem ícone)
                    div.appendChild(contentDiv);
                    main.appendChild(div);
                }

            });
        }).catch(err => console.error(err));
    }
};
