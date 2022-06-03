import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

export function appConfig(app: INestApplication): INestApplication {
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const secret = configService.get('APP_SECRET');

  //Swagger config
  const config = new DocumentBuilder()
    .setTitle('MaaS API')
    .setDescription('The MaaS API description')
    .setVersion('1.0')
    .addTag('maas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser(secret));

  app.use(
    session({
      secret: secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        signed: true,
        sameSite: 'strict',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  return app;
}
