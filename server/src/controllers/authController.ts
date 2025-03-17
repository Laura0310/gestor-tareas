import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db/client";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      res.status(400).json({ message: "El usuario ya existe" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.status(201).json({ token, user: { id: newUser.id, name, email } });
  } catch (error) {
    console.error("Error de registro:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({ message: "Credenciales incorrectas" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Credenciales incorrectas" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.status(200).json({ token, user: { id: user.id, name: user.name, email } });
  } catch (error) {
    console.error("Error de inicio de sesión:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
