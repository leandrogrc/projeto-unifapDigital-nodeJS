const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('../jwt');
const bcrypt = require('bcrypt');

module.exports = {

    async registerUser(req, res) {
        const { nome, email, senha } = req.body;
    
        try {
          
            const userExist = await prisma.user.findFirst({
            where: {
                email,
            },
        });
    
        if (userExist) {
            return res.status(400).json({ error: "Email already in use" });
        }
    
          
        const hashedSenha = await bcrypt.hash(senha, 10); // O segundo argumento é o custo do hash
    
          
        const user = await prisma.user.create({
            data: {
                email,
                nome,
                senha: hashedSenha, 
            },
        });
    
          
        const token = jwt.createToken({ userId: user.id });
    
            res.json({ Mensagem: "User registered successfully!", token });
        } catch (error) {
          res.json({ error });
        }
    },

    async login(req, res) {
        const { email, senha } = req.body;
    
        try {
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        });
    
        if (!user) {
            return res.status(401).json({ error: "Login failed" });
        }
    
          
        const senhaMatch = await bcrypt.compare(senha, user.senha);
    
        if (!senhaMatch) {
            return res.status(401).json({ error: "Login failed" });
        }
    
          
        const token = jwt.createToken({ userId: user.id });
    
            res.json({ Mensagem: "Login successful!", token });
        } catch (error) {
            res.json({ error });
        }
    },

    async searchUser(req, res) {
        const { id } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id, 10) },
            });
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    },

    async searchUsers(req, res) {
        const users = await prisma.user.findMany();
        res.json(users);
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;
    
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) },
            });
    
            if (!user) {
                return res.json({ error: "ERROR: This user don't exist, please try again." });
            }
    
            const updatedUser = await prisma.user.update({
                where: { id: parseInt(id) },
                data: { nome, email },
                select: {
                    nome: true,
                    email: true,
                },
            });
            return res.json(updatedUser);
    
        } catch (error) {
            res.json(error);
        }
    },
    
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
    
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) },
            });
    
            if (!user) {
                return res.json({ error: "ERROR: This user don't exist, please try again." });
            }
    
            await prisma.user.delete({
                where: { id: parseInt(id) },
            });
            return res.json("This user is deleted. Sorry.");
    
        } catch (error) {
            res.json(error);
        }
    },
    
};