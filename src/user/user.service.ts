import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(name: string, email: string, password: string) {

    if(name === "" || email === "" || password === ""){
      throw new ConflictException('Preencha todos os campos');  
    }
    if(password.length < 8){
      throw new BadRequestException('Senha deve ter no mínimo 8 caracteres');
    }
    const existingUser = await this.prisma.user.findUnique({
      where:{email},
    })

    if(existingUser){
      throw new ConflictException('Email já cadastrado');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
  async loginUser(email: string, password: string) {
    if(email === "" || password === ""){
      throw new ConflictException('Preencha todos os campos');  
    }
    if(password.length < 8){
      throw new BadRequestException('Senha deve ter no mínimo 8 caracteres');
    }
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new ConflictException('Email não cadastrado');
    }
   
    if (!bcrypt.compare(password, user.password)) {
      throw new ConflictException('Senha incorreta');
    }

    const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '2h'});
    return {user, token};
  }
}

