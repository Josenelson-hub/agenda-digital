import { loadJSON } from "../data/fetchData.js";

export const renderData = (url, key, label1, label2) => {
    if (window.location.href.includes(url)) {
        let main = document.querySelector('.main');

        loadJSON('json/info.json').then(data => {
            const items = data[key];

            items.forEach(item => {
                // Container principal do card
                let div = document.createElement('div');
                div.classList.add('list');

                // DIV do conteúdo (h2 e p)
                let infoDiv = document.createElement('div');

                let h2 = document.createElement('h2');
                h2.textContent = item[label1];

                let p = document.createElement('p');
                p.innerHTML = item[label2].replace(/--/g, '<br>');

                infoDiv.appendChild(h2);
                infoDiv.appendChild(p);

                // DIV do ícone (somente nas igrejas)
                let iconDiv = document.createElement('div');

                if (window.location.href.includes('igrejas')) {
                    let icon = document.createElement('span');
                    icon.textContent = "→";
                    icon.classList.add('external-icon');
                    iconDiv.appendChild(icon);
                }

                // Monta a estrutura
                div.appendChild(infoDiv);
                div.appendChild(iconDiv);

                // Se for igrejas, o card inteiro vira um link
                if (window.location.href.includes('igrejas')) {
                    let link = document.createElement('a');
                    link.href = item.url;
                    link.appendChild(div);
                    main.appendChild(link);
                } else {
                    main.appendChild(div);
                }
            });
        }).catch(err => console.error(err));
    }
};