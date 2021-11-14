import {API} from "../constants/Constants"
import {API_ROUTES} from "../constants/Routes";

export const getAllEvents = () => {
    return fetch(`${API}${API_ROUTES.event_base_url+API_ROUTES.event_enable_url}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};
