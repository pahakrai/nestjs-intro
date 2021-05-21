// import { PartialType } from '@nestjs/mapped-types';
// makes it compatible with swagger
import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}