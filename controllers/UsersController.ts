import "dotenv/config";
import { PrismaUserModel } from '../models/PrismaUsersModel.ts';
import { Request, Response } from 'express';
import { IPrismaUserModel } from "../models/interfaces/IPrismaUsersModel.ts"
import jwt from 'jsonwebtoken';



export class UsersController {

    public prismaUserModel: IPrismaUserModel = new (PrismaUserModel);

    async register(req: Request, res: Response) {
        try {
            const userForm = req.body;
            const { name, password } = userForm;

            if (!name || !password) {
                return res.status(400).json({
                    message: "Nome e senha são obrigatórios"
                })
            }

            const user = await this.prismaUserModel.create(userForm);
            return res.status(201).json({
                message: "Sucesso ao registrar o usuário",
                user
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao registrar o usuário",
                exc: error.message
            })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { name, password } = req.body;

            if (!name || !password) {
                return res.status(400).json({
                    message: "Nome e senha são obrigatórios"
                })
            }

            const user = await this.prismaUserModel.findByName(name);

            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                })
            }

            const isPasswordValid = await this.prismaUserModel.validatePassword(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    message: "Senha inválida"
                })
            }

            const secret = process.env.SECRET;
            if (!secret) {
                return res.status(500).json({
                    message: "Chave secreta não configurada"
                })
            }

            const accessToken = jwt.sign({ id: user?.id }, secret , { expiresIn: '1h' });
            const refreshToken = jwt.sign({ id: user?.id }, secret, { expiresIn: '7d' });

            await this.prismaUserModel.addRefreshToken(user.id, refreshToken);
            

            return res.status(200).json({
                message: "Sucesso ao fazer login",
                user,
                accessToken : accessToken,
                refreshToken : refreshToken
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao fazer login",
                exc: error.message
            })
        }
    }

    async refresh(req: Request, res: Response) {
        const { refreshToken } = req.body;

        if (!refreshToken) return res.sendStatus(401);

        const user = await this.prismaUserModel.findByRefreshToken(refreshToken);
        if (!user) return res.sendStatus(403);

        const secret = process.env.SECRET;
        if (!secret) return res.sendStatus(500);

        jwt.verify(refreshToken, secret, (err: any, decoded: any) => {
            if (err) return res.sendStatus(403);

            const jwtSecret = process.env.SECRET;
            if (!jwtSecret) return res.sendStatus(500);

            // 3. Gera um NOVO Access Token
            const newAccessToken = jwt.sign({ id: decoded.id }, jwtSecret, { expiresIn: '15m' });

            res.json({ accessToken: newAccessToken });
        });
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    message: "ID é obrigatório"
                })
            }

            const user = await this.prismaUserModel.findById(Number(id));

            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                })
            }

            return res.status(200).json({
                message: "Usuário encontrado",
                user
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao buscar usuário",
                exc: error.message
            })
        }
    }
}