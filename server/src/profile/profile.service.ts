import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async find({ email, provider }: AuthGuardUserDto): Promise<Profile> {
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

  async update(data: UpdateProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy({ id: +data.id });
    this.profileRepository.merge(profile, data);

    return await this.profileRepository.save(profile);
  }
}
