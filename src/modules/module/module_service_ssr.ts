import axios from "axios";


export async function fetchModules(token: string) {
    const res = await axios('http://localhost:8080/module', {
        headers: { Authorization: token },
    });

    if (!res) {
        throw new Error('Erro ao buscar módulos');
    }

    if (!res.data.modules) return [];

    return res.data.modules;
}