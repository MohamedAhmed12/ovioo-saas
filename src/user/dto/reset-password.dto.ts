import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { PasswordDto } from './password.dto';

@InputType()
export class ResetPasswordDto extends PasswordDto {
  @IsString()
  @Field()
  resetToken: string;
}
