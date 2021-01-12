import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @Post()
  async create(@Res() res, @Body() createUsersDto: CreateUsersDto){
    const newUser = await this.usersService.create(createUsersDto);
    return res.status(HttpStatus.OK).json(newUser);
  }

  @Get('/:id')
  async getUser(@Param() params, @Res() res){
    // console.log(params.id + '');
    const response = await this.usersService.findUser(params.id);
    return res.status(HttpStatus.OK).json(response);
    // console.log(response);
  }

  @Get()
  async getAllUsers(@Res() res){
    const response = await this.usersService.findAllUsers();
    return res.status(HttpStatus.OK).json(response);
  }
}

