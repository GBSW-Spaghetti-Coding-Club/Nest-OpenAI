import { IsString, MaxLength, MinLength} from "class-validator";

export class drawImgDto {
    @IsString()
    @MaxLength(10)
    @MinLength(0)
    nature: string;
}