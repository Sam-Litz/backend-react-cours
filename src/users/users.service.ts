import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,){}

  async create(createUserDto: CreateUsersDto): Promise<User>{
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findUser(userId): Promise<User>{
    return this.userModel.findById(userId).exec();
  }

  async findAllUsers(): Promise<User[]>{
    return this.userModel.find().exec();
  }
}
