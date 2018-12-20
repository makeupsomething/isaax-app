import { ISAAX_API_KEY } from 'react-native-dotenv'
const baseUrl = 'https://api.isaax.io'

export function get(url) {
    return fetch(`${baseUrl}${url}`, {
        headers: {
            "Authorization": `Bearer ${ISAAX_API_KEY}`,
        },
    })
    .then((response) => {
        return response.json();
    })
}

export function post(url) {
    return fetch(`${baseUrl}${url}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${ISAAX_API_KEY}`,
        },
    })
    .then((response) => {
        return response;
    })
    .catch(error => console.error('Error:', error));
}