import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  avatar?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  fullname?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  phone?: number;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}
