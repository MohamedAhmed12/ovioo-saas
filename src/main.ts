import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config as AWSConfig } from 'aws-sdk';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  AWSConfig.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_KEY_SECRET,
    region: process.env.AWS_REGION,
  });

  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.reduce(
          (acc, error) => {
            acc[0][error.property] =
              error.constraints[Object.keys(error.constraints)[0]];

            return acc;
          },
          [{}],
        );

        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
