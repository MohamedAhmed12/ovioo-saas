import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { hash } from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthProviderEnum } from './enums/auth-provider.enum';
import { Profile } from 'src/profile/profile.entity';

@Entity('users')
@ObjectType({ description: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text')
  @Field(() => String)
  firstname: string;

  @Column('text')
  @Field(() => String)
  lastname: string;

  @Column('text', { unique: true })
  @Field(() => String)
  email: string;

  @Column('text', { nullable: true })
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

  @Column('text')
  @Field(() => String)
  provider: string;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @CreateDateColumn()
  @Field()
  updated_at: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  @Field(() => Profile, { defaultValue: null })
  profile: Profile;

  @BeforeInsert()
  async hashPass() {
    if (this.provider === AuthProviderEnum.Credentials) {
      this.password = await hash(this.password, 12);
    }
  }
}
