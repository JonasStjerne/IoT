import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as Honeybadger from '@honeybadger-io/js';
import { CustomLogger } from './_middlewares/customLogger.middleware';
import { NotFoundInterceptor } from './_interceptors/not-found.interceptor';

import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new CustomLogger(),
    rawBody: true,
  });
  app.enableCors({
    allowedHeaders: ['Content-type'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    origin: '*',
    credentials: true,
  });

  //Swagger global setup at /api
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  //Save openapi spec for application
  fs.writeFileSync('/shared/openapi-spec.json', JSON.stringify(document));

  SwaggerModule.setup('/api', app, document);

  //Global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  //Global Interceptors
  //If entity not found, return http not found
  app.useGlobalInterceptors(new NotFoundInterceptor());

  //Remove @Exclude() from response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //HoneyBadger for error tracking and app monitoring
  Honeybadger.configure({ apiKey: process.env.HONEYBADGER_API_KEY });

  //Listen on port 3000
  await app.listen(3000);
  // const client = createClient();
  // await client.connect();
  // await client.ft.create(
  //   'idx:books',
  //   {
  //     title: {
  //       type: SchemaFieldTypes.TEXT,
  //       textSearch: true,
  //     },
  //   },
  //   {
  //     ON: 'HASH',
  //     PREFIX: 'redis:books',
  //   },
  // );
}
bootstrap();
