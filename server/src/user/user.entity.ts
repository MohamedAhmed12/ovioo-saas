import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { hash } from 'bcrypt';
import { Profile } from 'src/profile/profile.entity';
import { Team } from 'src/team/team.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthProviderEnum } from './enums/auth-provider.enum';
import { UserRoleEnum } from './enums/user-role.enum';

@Entity('users')
@ObjectType({ description: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text')
  @Field(() => String)
  fullname: string;

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
  @Field(() => Profile)
  profile: Profile;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.User,
  })
  @Field(() => UserRoleEnum)
  role: UserRoleEnum;

  @ManyToOne(() => Team, (team) => team.users, { cascade: true })
  @Field(() => Team)
  team: Team;

  @BeforeInsert()
  async hashPass() {
    if (this.provider === AuthProviderEnum.Credentials) {
      this.password = await hash(this.password, 12);
    }
  }
}
