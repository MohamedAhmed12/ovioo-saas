import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('profiles')
@ObjectType({ description: 'profiles' })
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text', { nullable: true, unique: true })
  @Field(() => String, { nullable: true })
  company_name: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  company_website: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  business_info: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  target_audience: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  company_links: string;

  @Column('text', { default: false })
  @Field(() => Boolean)
  push_notification_enabled: boolean;

  @Column('text', { default: false })
  @Field(() => Boolean)
  mail_notification_enabled: boolean;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @CreateDateColumn()
  @Field()
  updated_at: Date;
}
