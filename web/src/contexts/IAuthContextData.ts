import IUser from './IUser';
import IAuthData from '../services/auth/IAuthData';

export default interface IAuthContextData {
    signed: boolean;
    user: IUser | null;
    signIn(authData: IAuthData, rememberMe: boolean): void;
    signOut(): void;
}