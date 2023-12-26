import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Asset } from 'src/asset/asset.entity';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageStatusEnum } from './enum/message-status.enum';

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

  @Column({
    type: 'text',
    default: MessageStatusEnum.SENT,
  })
  @Field(() => String, { nullable: true })
  status: MessageStatusEnum;

  @Column('varchar', { array: true, default: [] })
  @Field(() => [String], { defaultValue: [] })
  received_by: string[];

  @Column('varchar', { array: true, default: [] })
  @Field(() => [String], { defaultValue: [] })
  read_by: string[];

  @Column({ name: 'sender_id' })
  sender_id: number;

  @ManyToOne(() => User, (user) => user.messages, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'sender_id' })
  @Field(() => User, { nullable: true })
  sender: User;

  @ManyToOne(() => Task, (task) => task.messages, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({ name: 'taskId' })
  @Field(() => Task)
  task: Task;

  @OneToOne(() => Asset, (asset) => asset.message, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'assetId' })
  @Field(() => Asset, { nullable: true })
  asset: Asset;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @CreateDateColumn()
  @Field()
  updated_at: Date;
}
