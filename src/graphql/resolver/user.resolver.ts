import { IResolvers } from 'graphql-tools';
import { User } from '../../model/User';
import * as UserService from '../../service/UserService';
import {
    ListUserArgs,
    GetUserArgs,
    CreateUserArgs,
    UpdateUserArgs,
    DeleteUserArgs,
    SuccessStatus
} from '../schema/user.schema';

export const userResolver: IResolvers = {
    Query: {
        users: async (_: unknown, args: ListUserArgs): Promise<User[]> => {
            const users = await UserService.findAll(args);
            return users;
        },

        user: async (_: unknown, args: GetUserArgs): Promise<User | null> => {
            const user = await UserService.findOne(Number(args.id), {});
            return user || null;
        }
    },

    Mutation: {
        createUser: async (
            _: unknown,
            { nickname }: CreateUserArgs
        ): Promise<SuccessStatus> => {
            return await UserService.createOne(nickname)
                .then(_ => ({ success: true }))
                .catch(error => ({ success: false, message: error?.message }));
        },

        updateUser: async (
            _: unknown,
            { id, input }: UpdateUserArgs
        ): Promise<SuccessStatus> => {
            const { nickname } = input;
            const updatedUser = await UserService.updateOne(
                Number(id),
                nickname
            );
            const success = updatedUser ? true : false;
            return { success };
        },

        deleteUser: async (
            _: unknown,
            { id }: DeleteUserArgs
        ): Promise<SuccessStatus> => {
            return await UserService.removeOne(Number(id))
                .then(_ => ({ success: true }))
                .catch(_ => ({ success: false }));

        }
    }
};
