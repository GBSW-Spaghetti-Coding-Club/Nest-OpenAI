import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { ImageGenerationDto } from './dto/image-generation.dto';

@Injectable()
export class GptService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateImage(imageParams: ImageGenerationDto): Promise<string> {
    try {
      const prompt = `${imageParams.clothing}옷을 입고 ${imageParams.hairColor}의 ${imageParams.hairStyle} 머리를 하고 있는 정면을 바라보는 ${imageParams.gender}사람`;

      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
      });

      return response.data[0].url;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }
}
