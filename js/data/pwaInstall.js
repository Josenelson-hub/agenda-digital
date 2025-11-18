export function initPWAInstall() {
    let deferredPrompt;
    const installButton = document.getElementById('install-btn');

    if (!installButton) return;

    // Evento disparado quando o PWA pode ser instalado
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.style.display = 'block';
    });

    // Clique no botão de instalação
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        console.log('Resultado da instalação:', choiceResult.outcome);

        installButton.style.display = 'none';
        deferredPrompt = null;
    });

    // Esconde botão se app já instalado
    window.addEventListener('appinstalled', () => {
        console.log('PWA instalado com sucesso!');
        installButton.style.display = 'none';
    });
}
