import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import {v4 as uuid} from 'uuid';  // uuid is a library that generates unique ids

@Injectable()
export class BrandsService {
  private brands: Brand[] = [{
    id: uuid(),
    name: 'Nike',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  }];

  create(createBrandDto: CreateBrandDto) {
    const newBrand = {
      id: uuid(),
      ...createBrandDto,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    this.brands.push(newBrand);
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brand = { ...brand, ...updateBrandDto, updatedAt: new Date().getTime() };
      }
      return brand;
    });
  }

  remove(id: string) {
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return `This action removes a #${id} brand`;
  }
}

