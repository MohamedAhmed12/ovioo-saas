import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { ReadMessageArgsDto } from './read-message-args.dto';

@ObjectType()
export class ReadMessageResponseDto extends ReadMessageArgsDto {
  @Field(() => User)
  user: User;
}
