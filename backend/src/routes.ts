import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controller/OrphanagesController';
import UsersController from './controller/UsersController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.post('/users/create', UsersController.create);
routes.post('/users/signin', UsersController.signIn);

export default routes;