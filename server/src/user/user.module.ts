import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { Profile } from 'src/profile/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
