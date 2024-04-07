import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
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
  await app.listen(process.env.PORT);
}
bootstrap();
