import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppLogger } from './app.logger';

const logger = new AppLogger('Index');
logger.log(`Start`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

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

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
