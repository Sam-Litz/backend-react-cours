import { Controller, HttpStatus, Post, Get, Request, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Body() createUsersDto: CreateUsersDto){
    return this.authService.login(createUsersDto);
  }
}
