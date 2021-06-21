import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';
import userView from '../views/users_view';
import EncryptionUtils from '../utils/EncryptionUtils';
import { TokenCreation } from '../utils/JWTManager';

export default {
    async index(request: Request, response: Response){
        const usersRespository = getRepository(User);
        const users = await usersRespository.find();

        return response.status(200).json(userView.renderMany(users));
    },

    async show(request: Request, response: Response){
        const { id } = request.params;

        const usersRepository = getRepository(User);
        const user = await usersRepository.findOneOrFail(id);

        return response.status(200).json(userView.render(user));
    },

    async create(request: Request, response: Response){
        const { name, email, password } = request.body;

        const usersRepository = getRepository(User);

        const data = {
            name,
            email,
            password: ''
        };

        await EncryptionUtils.encryptPassword(password).then(result => {
            data.password = result;
        });

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().max(300),
            password: Yup.string().required()
        });

        await schema.validate(data, { abortEarly: false });

        const user = usersRepository.create(data);

        await usersRepository.save(user);

        const token = TokenCreation(user.id, user.name, user.email);

        return response.status(201).json({ message: "The user has been created with success.", token: token});
    },

    async signIn(request: Request, response: Response){
        const { email, password } = request.body;

        if (!email || !password)
            response.status(400).json({ message: "Email or password not received."});

        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({ email: email });

        if (!user)
            return response.status(404).json({ message: "The user cannot be found."});

        const checkPassword = await EncryptionUtils.comparePassword(password, user.password);

        if (!checkPassword) 
            return response.status(404).json({ message: "The user cannot be found."});

        const token = TokenCreation(user.id, user.name, user.email);

        checkPassword ?
        response.status(200).json( { token: token, user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
        :
        response.status(404).json({ message: "The user cannot be found."});
    },
};