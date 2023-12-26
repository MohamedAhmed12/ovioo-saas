import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

@InputType()
@ObjectType('notificaiton_dto')
export class NotificationDto {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id: number;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  content?: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  is_read: boolean;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  action: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  userId: number;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  created_at?: Date;
}
