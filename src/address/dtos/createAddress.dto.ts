import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  complememt: string;

  @IsInt()
  numberAddress: number;

  @IsString()
  cep: string;

  @IsInt()
  cityId: number;
}
