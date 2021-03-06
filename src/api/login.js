import {NETLIFY_PREFIX} from './constants';

export const loginAPI = async ({
    email,
    password
}) => {
    const response = await fetch(`${NETLIFY_PREFIX}/user/login`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });
    if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    }
    const errorJSON = await response.json();
    throw errorJSON.error || {message: 'Some error occured'};

};