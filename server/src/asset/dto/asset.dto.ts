import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AssetDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  src: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  alt: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  type: string;
}
