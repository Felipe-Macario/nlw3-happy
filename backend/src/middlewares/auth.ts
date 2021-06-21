import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { TokenCreation } from '../utils/JWTManager';

export default function authenticateToken(request: Request, response: Response, next: NextFunction){
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return response.sendStatus(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decodedToken: any) => {
    if (err) return response.sendStatus(403).json({ auth: false, message: 'Failed to authenticate token.' });

    const { id, name, email } = decodedToken;

    console.log(decodedToken + " decoded token");

    const newToken = TokenCreation(id, name, email);

    response.header('Authorization', newToken);
    next();
  });
}