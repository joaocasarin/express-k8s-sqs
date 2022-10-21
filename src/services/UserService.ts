import prisma from '@database';
import { hash } from 'bcryptjs';
import { User, UserResponse } from '@interfaces/User';

export interface UpdateUserParams {
    id: number;
    data: Partial<User>;
}

class UserService {
    public async getUserById(id: number): Promise<UserResponse> {
        const user = await prisma.user.findFirst({ where: { id } });

        if (!user) {
            throw new Error(
                `GetUserByIdService: User with id {${id}} not found.`
            );
        }

        return user;
    }

    public async getUsers(): Promise<UserResponse[]> {
        const users = await prisma.user.findMany();

        return users;
    }

    public async createUser({
        name,
        email,
        password
    }: User): Promise<UserResponse> {
        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return user;
    }

    public async updateUser({
        id,
        data
    }: UpdateUserParams): Promise<UserResponse> {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    ...data
                }
            });

            return updatedUser;
        } catch (error) {
            throw new Error(
                `UpdateUserService: User with id {${id}} not found.`
            );
        }
    }

    public async deleteUser(id: number): Promise<UserResponse> {
        try {
            const deletedUser = await prisma.user.delete({
                where: {
                    id
                }
            });

            return deletedUser;
        } catch (error) {
            throw new Error(
                `DeleteUserService: User with id {${id}} not found.`
            );
        }
    }
}

export default new UserService();
