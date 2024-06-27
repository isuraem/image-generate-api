import { PartialType } from '@nestjs/mapped-types';
import { CreateImageGenerateDto } from './create-image-generate.dto';

export class UpdateImageGenerateDto extends PartialType(CreateImageGenerateDto) {}
