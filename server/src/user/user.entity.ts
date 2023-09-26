import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { hash } from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
@ObjectType({ description: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text')
  @Field()
  firstname: string;

  @Column('text')
  @Field()
  lastname: string;

  @Column('text', { unique: true })
  @Field()
  email: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  avatar: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  company: string;

  @Column('text', { nullable: true })
  @Field(() => Int, { nullable: true })
  phone: number;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @CreateDateColumn()
  @Field()
  updated_at: Date;

  @BeforeInsert()
  async hashPass() {
    this.password = await hash(this.password, 12);
  }
}
