import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { randomUUID } from 'crypto';
import { filter } from 'rxjs';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    const allowedKeys = ['name', 'age', 'color']; //
    const filteredCreate: any = Object.keys(cat)
      .filter((key) => allowedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = cat[key];
        return obj;
      }, {});
    if (filteredCreate) {
      filteredCreate.id = randomUUID();
      this.cats.push(filteredCreate);
    }
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: string) {
    const findCat = this.cats.find((cat) => cat.id === id);
    if (findCat) {
      return findCat;
    }
    throw new NotFoundException('Cat not found');
  }

  update(id: string, updateCatDto: UpdateCatDto): Cat | null {
    const foundCat = this.findOne(id);
    if (foundCat) {
      const allowedKeys = ['name', 'age', 'color']; //
      const filteredUpdate = Object.keys(updateCatDto)
        .filter((key) => allowedKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = updateCatDto[key];
          return obj;
        }, {});
      const updatedCat = Object.assign(foundCat, filteredUpdate);
      this.cats[id] = updatedCat;
      return updatedCat;
    }
    throw new NotFoundException();
  }

  remove(id: string) {
    const foundCat = this.findOne(id);
    if (foundCat) {
      const index: any = this.cats.filter(function (item) {
        return item.id === id;
      });
      console.log(index);
      this.cats.splice(index, 0);
      return `This action removes a #${foundCat.name} cat`;
    }
    throw new NotFoundException();
  }
}
