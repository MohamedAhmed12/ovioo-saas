import { registerEnumType } from '@nestjs/graphql';

export enum TaskTypesEnum {
  Webflow = 'Webflow',
  LogoAndIdentity = 'Logo & Identity',
  Website = 'Website & App',
  LandingPage = 'Landing Page',
  MobileApp = 'Mobile App',
  CustomIllustration = 'Custom Illustration',
  Animation = 'Animation',
  Packing = 'Print & Packing',
  BannerAndDigital = 'Banner & Digital Ads',
  Email = 'Email',
  Book = 'Book',
  Photo = 'Photo & Image',
}

registerEnumType(TaskTypesEnum, { name: 'TaskTypesEnum' });
