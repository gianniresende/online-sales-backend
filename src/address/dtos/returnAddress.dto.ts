import { ReturnCityDto } from 'src/city/dtos/returnCity.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  id: number;
  address: string;
  zipCode: string;
  city?: ReturnCityDto;

  constructor(address: AddressEntity) {
    this.id = address.id;
    this.address = address.complement;
    this.zipCode = address.cep;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
