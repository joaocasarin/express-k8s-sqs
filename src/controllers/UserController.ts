import Logger from '@configs/logger';
import { User } from '@interfaces/User';
import { Prisma } from '@prisma/client';
import UserService from '@services/UserService';
import { Request, Response, NextFunction } from 'express';

class UserController {
    public async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };

            if (!id) {
                throw new Error('GetUserByIdController: Missing id param.');
            }

            const user = await UserService.getUserById(Number(id));
            Logger.info(
                `GetUserByIdController: User retrieved: ${JSON.stringify(user)}`
            );

            return res.status(200).send({ user });
        } catch (error) {
            return next(error);
        }
    }

    public async getUsers(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getUsers();
            Logger.info(
                `GetUsersController: Users retrieved: ${JSON.stringify(users)}`
            );

            return res.status(200).send({ users });
        } catch (error) {
            return next(error);
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body as {
            name: string;
            email: string;
            password: string;
        };

        if (!name) throw new Error('CreateUserController: Missing name param.');

        if (!email)
            throw new Error('CreateUserController: Missing email param.');

        if (!password)
            throw new Error('CreateUserController: Missing password param.');

        try {
            const user = await UserService.createUser({
                name,
                email,
                password
            });
            Logger.info(
                `CreateUserController: User created: ${JSON.stringify(user)}`
            );

            return res.status(201).send({ user });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                error.message = `CreateUserController: User with e-mail ${email} already exists.`;
                return next(error);
            }

            return next(error);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.query as { id: string };
            const data = req.body as User;

            if (!id) {
                throw new Error('UpdateUserController: Missing user id.');
            }

            if (Number.isNaN(Number(id))) {
                throw new Error(
                    `UpdateUserController: Invalid user id. Id: ${id}`
                );
            }

            if (!data) {
                throw new Error('UpdateUserController: Missing user data.');
            }

            const newUser = await UserService.updateUser({
                id: Number(id),
                data
            });
            Logger.info(
                `UpdateUserController: User updated: ${JSON.stringify(newUser)}`
            );

            return res.status(200).send({ user: newUser });
        } catch (error) {
            return next(error);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };

            if (!id) {
                throw new Error('DeleteUserController: Missing user id.');
            }

            if (Number.isNaN(Number(id))) {
                throw new Error(
                    `DeleteUserController: Invalid user id. ID: ${id}`
                );
            }

            const user = await UserService.deleteUser(Number(id));
            Logger.info(
                `DeleteUserController: User deleted: ${JSON.stringify(user)}`
            );

            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }
}

export default new UserController();
