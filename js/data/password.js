import { loadJSON } from "./fetchData.js";

export const getCorrectPassword = async () => {
    const data = await loadJSON('json/senha.json');
    return data.senha[0].senha;
};
