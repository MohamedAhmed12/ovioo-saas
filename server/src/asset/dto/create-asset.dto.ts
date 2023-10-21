import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { AssetDto } from './asset.dto';

@InputType()
export class CreateAssetDto {
  @Field(() => [AssetDto])
  assets: AssetDto[];

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  task_id: number;
}
