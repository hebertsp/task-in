import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    cat.id = randomUUID();
    this.cats.push(cat);
    console.log(cat);
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
      const updatedCat = Object.assign(foundCat, updateCatDto);
      this.cats[id] = updatedCat;
      return updatedCat;
    }
    throw new NotFoundException();
  }

  remove(id: string) {
    const foundCat = this.findOne(id);
    if (foundCat) {
      this.cats.pop();
      return `This action removes a #${foundCat.name} cat`;
    }
    throw new NotFoundException();
  }
}
