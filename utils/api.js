import { ISAAX_API_KEY } from 'react-native-dotenv'

export function get(url) {
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${ISAAX_API_KEY}`,
        },
    })
    .then((response) => {
        return response.json();
    })
}

export function post(url) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${ISAAX_API_KEY}`,
        },
    })
    .then((response) => {
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}