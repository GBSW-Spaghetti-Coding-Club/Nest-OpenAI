import { Controller, Get, Query } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ImageGenerationDto } from './dto/image-generation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { drawImgDto } from './dto/draw-image.dto';

@ApiTags('GPT')
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: 'GPT 이미지 생성' })
  @Get('generate-image')
  async generateImage(
    @Query() imageParams: ImageGenerationDto,
  ): Promise<{ imageUrl: string }> {
    const imageUrl = await this.gptService.generateImage(imageParams);
    return { imageUrl };
  }
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({summary: '자연환경 배경 GPT 이미지 생성'})
  @Get('drawPaint')
  async drawImg(
    @Query() drawPaint: drawImgDto,
  ): Promise<{ drawUrl: string }> {
    const drawUrl = await this.gptService.drawPainting(drawPaint);
    return { drawUrl };
  }
}
