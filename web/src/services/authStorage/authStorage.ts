import IStoredData from "./IStoredData";
import IUser from "../../contexts/IUser";
import { StorageType } from "./StorageType";

function saveUserInStorage(user: IUser, token: string, storageLocation: StorageType){
    if (storageLocation === StorageType.Local){
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    } else if (storageLocation === StorageType.Session){
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
    }
}

function getUserFromStorage(storageLocation: StorageType): Promise<IStoredData>{
    return new Promise(resolve => {
        if (storageLocation === StorageType.Local){
            resolve({
                token: localStorage.getItem('token'),
                user: localStorage.getItem('user')
            });
        } else if (storageLocation === StorageType.Session){
            resolve({
                token: sessionStorage.getItem('token'),
                user: sessionStorage.getItem('user')
            });
        }
    });
}

function removeUserFromStorage(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
}

export { saveUserInStorage, getUserFromStorage, removeUserFromStorage}