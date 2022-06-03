import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly repository: Repository<Offer>,
  ) {}
  create(newOffer: CreateOfferDto): Promise<Offer> {
    const offer = this.repository.create(newOffer);
    return this.repository.save(offer);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Offer> {
    const offer = await this.repository.findOne({ where: { id } });
    return offer;
  }

  update(offer: Offer, updates: UpdateOfferDto) {
    Object.assign(offer, updates);

    return this.repository.save(offer);
  }

  remove(offer: Offer) {
    return this.repository.remove(offer);
  }
}
