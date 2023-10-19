import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class DeleteAssetDto {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  alt: string;
}
