import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AddExtraBundleDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  extra_bundle_id: number;
}
