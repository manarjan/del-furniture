import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const port: number = +process.env.PORT || 4000;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/'
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars')
    },
    templates: join(__dirname, '..', 'views')
  });
  await app.listen(port);
}
bootstrap();
