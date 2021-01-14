import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ){}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if(user && user.password == pass){
      const { password, ...result } = user;
      return result;
    }
    return null
  }

  async login(user: any): Promise<any>{
    const userInBd = await this.validateUser(user.email, user.password);
    if (!userInBd) {
      throw new HttpException('Mauvais mot de passe', HttpStatus.BAD_REQUEST);
    }
    const payload = { email: user.email, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
