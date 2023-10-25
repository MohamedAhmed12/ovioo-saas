import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('message')
@ObjectType({ description: 'message' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  content: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  voice_note_src: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  asset_src: string;

  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  @Field(() => User, { nullable: true })
  sender: User;

  @ManyToOne(() => Task, (task) => task.messages, { onDelete: 'CASCADE' })
  @Field(() => Task)
  task: Task;
}
