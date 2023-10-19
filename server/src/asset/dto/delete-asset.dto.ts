import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class DeleteAssetDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  src: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  version_id: string;
}
