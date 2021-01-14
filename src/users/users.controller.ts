import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UsePipes } from '@nestjs/common';
import { UsersPipe } from 'src/pipes/users.pipe';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @Post()
  async addUser(@Res() res, @Body(new UsersPipe()) createUsersDto: CreateUsersDto){
    const newUser = await this.usersService.create(createUsersDto);
    return res.status(HttpStatus.OK).json(newUser);
  }

  @Get('/:id')
  async getUser(@Param() params, @Res() res){
    const response = await this.usersService.findUser(params.id);
    return res.status(HttpStatus.OK).json(response);
    // console.logresponse);
  }

  @Get()
  async getAllUsers(@Res() res){
    const response = await this.usersService.findAllUsers();
    return res.status(HttpStatus.OK).json(response);
  }

  //Fonctionne pas
  @Post('/update')
  async updateUser(@Res() res, @Body() createUsersDto: CreateUsersDto, @Query() userId: string){
    const newUser = await this.usersService.updateUser(userId, createUsersDto);
    return res.status(HttpStatus.OK).json(newUser);
  }

  @Get('/delete/:id')
  async deleteUser(@Param() params, @Res() res){
    const response = await this.usersService.deleteUser(params.id);
    if(response != null){
      return res.status(HttpStatus.OK).json(response);
    }else{
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Utilisateur non trouvé'});
    }
  }
}

