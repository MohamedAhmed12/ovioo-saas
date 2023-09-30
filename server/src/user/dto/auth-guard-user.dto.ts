import { IsEmail, IsNumber, IsString } from 'class-validator';

export class AuthGuardUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  picture: string;

  @IsString()
  provider: string;

  @IsNumber()
  provider_id: number;
}
