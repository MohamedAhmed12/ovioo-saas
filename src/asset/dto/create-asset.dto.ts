import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAssetDto {
  @Field(() => [AssetDto])
  assets: AssetDto[];

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  task_id: number;
}

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

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  task_id?: number;
}
