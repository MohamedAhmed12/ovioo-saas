import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notifications')
@ObjectType({ description: 'notifications' })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  content: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  action: string;

  @Column('boolean', { default: false })
  @Field(() => Boolean, { nullable: true })
  is_read: boolean;

  @CreateDateColumn({ nullable: true })
  @Field()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @Column({ name: 'userId' })
  @Field(() => ID)
  userId: number;
}
