import React, { createContext, useState, useEffect, useContext } from 'react';

import * as authStorage from '../services/authStorage/authStorage';
import api from '../services/api';

import IAuthContextData from './IAuthContextData';
import IUser from './IUser';
import IAuthData from '../services/auth/IAuthData';

import { StorageType } from '../services/authStorage/StorageType';

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthProvider({children}: any) {
    const [user, setUser] = useState<IUser | null>(null)
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        let storageType = null;
        rememberMe ? storageType = StorageType.Local : storageType = StorageType.Session;

        authStorage.getUserFromStorage(storageType).then(storedData => {
            const storagedToken = storedData.token;
            const storagedUser = storedData.user;

            if (storagedUser && storagedToken){
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

                setUser(JSON.parse(storagedUser));
            }    
        })
    }, [rememberMe]);

    function signIn(authData: IAuthData, rememberMeCheckbox: boolean){
        setUser(authData.user);
        api.defaults.headers['Authorization'] = `Bearer ${authData.token}`;

        setRememberMe(rememberMeCheckbox);

        let storageType = null;
        rememberMeCheckbox ? storageType = StorageType.Local : storageType = StorageType.Session;

        authStorage.saveUserInStorage(authData.user, authData.token, storageType);
    }

    function signOut(){
        authStorage.removeUserFromStorage();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
}