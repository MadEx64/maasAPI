import { IsDefined, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUp {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsDefined()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  readonly password: string;
}
