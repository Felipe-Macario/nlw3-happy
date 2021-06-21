import jwt from 'jsonwebtoken';

export function TokenCreation (id: number, name: string, email: string){
    const token = jwt.sign(
        { id: id, name: name, email: email },
        process.env.NODE_ENV_SECRET_JWT as string,
        { expiresIn: '1800s' }
    );

    return token;
}