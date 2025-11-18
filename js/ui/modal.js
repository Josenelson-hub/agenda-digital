import { getCorrectPassword } from "../data/password.js";

export const initModal = () => {
    const openModalLink = document.getElementById('openModalLink');
    const modal = document.getElementById('modal');
    const submitBtn = document.getElementById('submitBtn');
    const error = document.querySelector('.error');

    if (!window.location.href.includes('index')) return;

    const openModal = e => {
        e.preventDefault();
        modal.style.display = 'flex';
    };

    openModalLink?.addEventListener('click', openModal);

    window.onclick = event => {
        if (event.target == modal) {
            modal.style.display = 'none';
            error.style.display = 'none';
        }
    };

    const submitAction = async () => {
        const passwordInput = document.getElementById('passwordInput');
        const correctPassword = await getCorrectPassword();

        if (passwordInput.value === correctPassword) {
            window.location.href = 'https://josenelson-hub.github.io/agenda-digital/contatos.html';
        } else if (passwordInput.value === '') {
            error.textContent = 'Insira a senha!';
            error.style.display = 'block';
        } else {
            error.textContent = 'Senha incorreta!';
            error.style.display = 'block';
        }
        passwordInput.value = '';
    };

    document.addEventListener('keydown', e => e.key === 'Enter' && submitAction());
    submitBtn?.addEventListener('click', submitAction);
};
