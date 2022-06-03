import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly price: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly eta: string;
}
