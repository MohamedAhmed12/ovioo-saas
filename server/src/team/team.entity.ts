import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('teams')
@ObjectType({ description: 'teams' })
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text', { default: '' })
  @Field(() => String, { nullable: true })
  name: string;

  @Column('int')
  @Field(() => Number)
  owner_id: number;

  @OneToMany(() => User, (user) => user.team)
  @Field(() => [User])
  users: User[];
}
