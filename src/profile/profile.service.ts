import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async find({
    email,
    provider,
  }: AuthGuardUserDto): Promise<Profile | undefined> {
    return await this.profileRepository.findOne({
      where: {
        user: {
          email,
          provider,
        },
      },
      relations: ['user'],
    });
  }

  async update({
    created_at,
    updated_at,
    ...data
  }: UpdateProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy({ id: data.id });

    if (!profile)
      throw new NotFoundException('Couldn’t find profile matches id.');

    await this.profileRepository.merge(profile, data);
    await this.profileRepository.update(profile.id, profile);

    return profile;
  }
}
