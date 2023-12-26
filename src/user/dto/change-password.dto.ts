import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { PasswordDto } from './password.dto';

@InputType()
export class ChangePasswordDto extends PasswordDto {
  @MaxLength(32)
  @MinLength(8)
  @Field()
  current_password: string;
}
