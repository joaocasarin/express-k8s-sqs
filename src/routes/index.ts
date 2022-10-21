import { Router } from 'express';
import UserRouter from '@routes/UserRoutes';

const routerV1 = Router();

routerV1.use(UserRouter);

export { routerV1 };
