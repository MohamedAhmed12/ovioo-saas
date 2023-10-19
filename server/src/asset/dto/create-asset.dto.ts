import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Asset } from '../asset.entity';

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
class AssetDto {
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
