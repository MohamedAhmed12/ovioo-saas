import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { AssetDto } from './asset.dto';

@InputType()
export class ListAssetsDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @Field(() => [AssetDto])
  assets: AssetDto[];
}
