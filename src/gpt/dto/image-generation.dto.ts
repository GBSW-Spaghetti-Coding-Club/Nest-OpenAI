import { IsString, MaxLength, MinLength } from 'class-validator';

export class ImageGenerationDto {
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  clothing: string;

  @IsString()
  @MinLength(1)
  @MaxLength(10)
  hairStyle: string;

  @IsString()
  @MinLength(1)
  @MaxLength(10)
  hairColor: string;

  @IsString()
  @MinLength(1)
  @MaxLength(10)
  gender: string;
}
