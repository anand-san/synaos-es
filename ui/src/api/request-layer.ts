import axios from "axios";
const AXIOS_TIMEOUT = 15000;

export let api = axios.create({
    timeout: AXIOS_TIMEOUT,
    headers: { "Content-Type": "application/json" },
});

export const getRandomUser = async () => {
    try {
        return await api({
            baseURL: "https://randomuser.me",
            method: "GET",
            url: "api",
        })
    } catch(e) {
        throw e
    }
}