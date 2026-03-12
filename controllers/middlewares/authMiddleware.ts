import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido" });
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: "Erro no formato do token (Esperado: Bearer <token>)" });
        }

        const token = parts[1];

        try {
            const decoded = jwt.verify(token, process.env.SECRET || 'sua_chave_secreta');

            return next();
        } catch (err) {
            return res.status(401).json({ message: "Token inválido ou expirado" });
        }
    }
}