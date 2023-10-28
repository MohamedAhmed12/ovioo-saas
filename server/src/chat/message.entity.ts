import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
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

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  content: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  voice_note_src: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  asset_src: string;

  @ManyToOne(() => User, (user) => user.messages, {
    eager: true,
    nullable: true,
  })
  @Field(() => User, { nullable: true })
  sender: User;

  @ManyToOne(() => Task, (task) => task.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  @Field(() => Task)
  task: Task;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @CreateDateColumn()
  @Field()
  updated_at: Date;
}
