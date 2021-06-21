export default interface IAuthData {
    token: string;
    user: {
        id: number,
        name: string,
        email: string
    };
}