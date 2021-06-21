import api from '../api';

import IAuthData from './IAuthData';
import ILoginData from './ILoginData';

export function signIn(loginData: ILoginData): Promise<IAuthData> {
    return new Promise((resolve, reject) => {
        api.post('/users/signin', loginData).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.message);
        });
    });
}