import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

const port = process.env.PORT || 3030;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // CORS 설정 수정
    app.enableCors({
      origin: [
        'http://sphagetti-front.s3-website.ap-northeast-2.amazonaws.com',
        'http://localhost:3000' // 로컬 개발 환경을 위해 추가
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: 'Content-Type, Accept, Authorization',
      credentials: true,
    });

    app.setGlobalPrefix('/api');

    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('개발을 위한 API 문서입니다.')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(port);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger documentation is available at http://localhost:${port}/api-docs`);
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
}

bootstrap();