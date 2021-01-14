import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

  async create(createUserDto: CreateUsersDto): Promise<User>{
    const userInDb = await this.findUserByEmail(createUserDto.email);
    console.log(userInDb);
    if(userInDb){
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findUser(userId): Promise<User>{
    return this.userModel.findById(userId).exec();
  }

  async findUserByEmail(email): Promise<User>{
    return this.userModel.findOne({'email': email}).exec();
  }

  async findAllUsers(): Promise<User[]>{
    return this.userModel.find().exec();
  }

  async deleteUser(userId): Promise<any>{
    return this.userModel.findByIdAndRemove(userId);
  }

  async updateUser(userId, createUserDto: CreateUsersDto): Promise<User>{
    const modifiedUser = await this.userModel.findByIdAndUpdate(userId, createUserDto);
    return modifiedUser;
  }
}
