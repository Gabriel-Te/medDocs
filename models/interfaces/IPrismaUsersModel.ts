import { users } from "@prisma/client";

export interface IPrismaUserModel {
    create(data: any): Promise<users>;
    findById(id: number): Promise<users | null>;
    findByName(name: string): Promise<users | null>;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
    findByRefreshToken(token: string): Promise<users | null>;
    addRefreshToken(userId: number, token: string): Promise<users>;
}