import UserService from '@services/UserService';
import { compare } from 'bcryptjs';
import prisma from '@database';
import { User } from '@interfaces/User';

describe('Testing the UserService methods', () => {
    // Clear the database before all tests
    beforeAll(async () => {
        await prisma.$queryRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
    });

    // Clear the database after each test
    afterEach(async () => {
        await prisma.$queryRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
    });

    test('should create an user', async () => {
        const user: User = {
            name: 'John Doe',
            email: 'john@doe.com',
            password: '12345678'
        };

        const result = await UserService.createUser(user);
        const hashedPassword = await compare(user.password, result.password);

        expect(result?.id).toEqual(1);
        expect(result?.name).toEqual(user.name);
        expect(result?.email).toEqual(user.email);
        expect(hashedPassword).toBeTruthy();
    });

    test('should get the user by id', async () => {
        const user: User = {
            name: 'John Doe',
            email: 'john@doe.com',
            password: '12345678'
        };

        const { id } = await UserService.createUser(user);

        const result = await UserService.getUserById(id);
        const hashedPassword = await compare(user.password, result!.password);

        expect(result?.id).toEqual(id);
        expect(result?.name).toEqual(user.name);
        expect(result?.email).toEqual(user.email);
        expect(hashedPassword).toBeTruthy();
    });

    test('should get all users', async () => {
        const userOne: User = {
            name: 'John Doe',
            email: 'john@doe.com',
            password: '12345678'
        };

        const userTwo: User = {
            name: 'Jane Doe',
            email: 'jane@doe.com',
            password: '12345678'
        };

        await UserService.createUser(userOne);
        await UserService.createUser(userTwo);

        const result = await UserService.getUsers();
        const hashedPasswordOne = await compare(
            userOne.password,
            result[0].password
        );
        const hashedPasswordTwo = await compare(
            userTwo.password,
            result[1].password
        );

        expect(result.length).toEqual(2);

        expect(result[0]?.id).toEqual(1);
        expect(result[0]?.name).toEqual(userOne.name);
        expect(result[0]?.email).toEqual(userOne.email);
        expect(hashedPasswordOne).toBeTruthy();

        expect(result[1]?.id).toEqual(2);
        expect(result[1]?.name).toEqual(userTwo.name);
        expect(result[1]?.email).toEqual(userTwo.email);
        expect(hashedPasswordTwo).toBeTruthy();
    });

    test('should update user name', async () => {
        const user: User = {
            name: 'John Doe',
            email: 'john@doe.com',
            password: '12345678'
        };

        const { id } = await UserService.createUser(user);

        const data: Partial<User> = {
            name: 'John Doe 2'
        };

        const result = await UserService.updateUser({ id, data });
        const hashedPassword = await compare(user.password, result.password);

        expect(result?.id).toEqual(1);
        expect(result?.name).toEqual('John Doe 2');
        expect(result?.email).toEqual(user.email);
        expect(hashedPassword).toBeTruthy();
    });

    test('should delete user', async () => {
        const user: User = {
            name: 'John Doe',
            email: 'john@doe.com',
            password: '12345678'
        };

        const { id } = await UserService.createUser(user);

        await UserService.deleteUser(id);

        const result = UserService.getUserById(id);

        await expect(result).rejects.toThrow(
            new Error(`GetUserByIdService: User with id {${id}} not found.`)
        );
    });
});
