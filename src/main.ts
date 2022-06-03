import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './appConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appConfig(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
