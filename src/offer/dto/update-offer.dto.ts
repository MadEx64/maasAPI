import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateOfferDto } from './create-offer.dto';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly price?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly eta?: string;
}
