import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetOffersDto {
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  readonly startLat: number;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  readonly startLong: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly startAddress: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly startCountry: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  readonly endLat: number;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  readonly endLong: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly endAddress: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly endCountry: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  readonly distance: number;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  readonly nbrOfPassengers: number;
}
