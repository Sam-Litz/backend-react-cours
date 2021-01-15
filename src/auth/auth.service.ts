import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ){}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    const hash = await bcrypt.hash(pass, 11);
    const isMatch = await bcrypt.compare(pass, hash);
    // console.log(user, isMatch);
    if(user && isMatch){
      const { password, ...result } = user;
      return result;
    }
    return null
  }

  async login(user: any): Promise<any>{
    const userInBd = await this.validateUser(user.email, user.password);
    // console.log(userInBd);
    if (!userInBd) {
      throw new HttpException('Mauvais mot de passe', HttpStatus.BAD_REQUEST);
    }
    const payload = { email: user.email, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
