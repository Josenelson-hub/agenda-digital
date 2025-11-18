export const initServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log("SW OK:", reg))
                .catch(err => console.log("SW Erro:", err));
        });
    }
};
