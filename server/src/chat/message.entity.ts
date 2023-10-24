import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/project.entity';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('message')
@ObjectType({ description: 'message' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text')
  @Field(() => String)
  content: string;

  @Column('text', { nullable: true })
  @Field(() => String)
  voice_note_src: string;

  @Column('text', { nullable: true })
  @Field(() => String)
  asset_src: string;

  @ManyToOne(() => User, (user) => user.messages, {
    cascade: true,
    nullable: true,
  })
  @Field(() => User, { nullable: true })
  sender: User;
}
