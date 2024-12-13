import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUser(@Body() createUserDto: { name: string; email: string; password: string }) {
    return this.userService.createUser(createUserDto.name, createUserDto.email, createUserDto.password);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: { email: string; password: string }) {
    return this.userService.loginUser(loginUserDto.email, loginUserDto.password);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
