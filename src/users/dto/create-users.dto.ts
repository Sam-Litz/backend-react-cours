import { IsString, IsInt } from 'class-validator';

export class CreateUsersDto{
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

}