import { IsString, IsInt } from 'class-validator';

export class CreateUsersDto{
  @IsString()
  readonly nom: string;

  @IsString()
  readonly prenom: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly email: string;

}