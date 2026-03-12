import { PrismaClient, users } from "@prisma/client";
import {prisma} from "./infra/mysql.adapter";
import { IPrismaUserModel } from "./interfaces/IPrismaUsersModel";
import bcrypt from "bcrypt";

export class PrismaUserModel implements IPrismaUserModel {


    async create(data: any): Promise<users> {
        console.log("Criando usuário com dados:", data);
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return prisma.users.create({
            data: {
                name: data.name,
                password: hashedPassword,

            }
        });
    }

    async findById(id: number): Promise<users | null> {
        return prisma.users.findUnique({
            where: { id }
        });
    }

    async findByName(name: string): Promise<users | null> {
        return prisma.users.findFirst({
            where: { name }
        });
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async findByRefreshToken(token: string): Promise<users | null> {
        return prisma.users.findFirst({
            where: { refresh_token: token }
        });
    }

    async addRefreshToken(userId: number, token: string): Promise<users> {
        return prisma.users.update({
            where: { id: userId },
            data: { refresh_token: token }
        });
    }

}