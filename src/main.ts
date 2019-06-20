import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppLogger } from './app.logger';

const logger = new AppLogger('Index');
logger.log(`Start`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Music project')
    .setDescription('Serverless Rock\'n\'roll')
    .setVersion('1.0')
    .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  logger.log(`Server is listening http://localhost:3000`);
  logger.log(`Swagger is listening http://localhost:3000/api`);

  await app.listen(3000);
}
bootstrap();
