import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Profile } from './profile.entity';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
