import {API} from "../constants/Constants"
import {API_ROUTES} from "../constants/Routes";

export const getAllGenders = () => {
    return fetch(`${API}${API_ROUTES.gender_base_url}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const getAthleteById = (athleteId) => {
    return fetch(`${API}${API_ROUTES.athlete_base_url}/${athleteId}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const addAthlete = (data) => {
    return fetch(`${API}${API_ROUTES.athlete_base_url}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const updateAthlete = (data, athleteId) => {
    return fetch(`${API}${API_ROUTES.athlete_base_url}/${athleteId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const addAthleteEvents = (data) => {
    return fetch(`${API}${API_ROUTES.athlete_base_url+"/"+API_ROUTES.event_base_url}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response)
        .catch(err => console.log(err))
};

export const uploadImage = (data, athleteId) => {
    let formdata = new FormData();
    formdata.append("image", data);

    fetch(`${API}${API_ROUTES.athlete_base_url+ API_ROUTES.athlete_image_upload_url }/${athleteId}`,{
        method: 'PUT',
        body: formdata,
    })
        .then(response => response)
        .catch(error => console.log('error', error));
};

export const searchAthlete = (url) => {
    return fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}
