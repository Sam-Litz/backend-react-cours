import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getPorifle(){
    return 'ici';
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  gettest(){
    return 'ici';
  }
  
}
