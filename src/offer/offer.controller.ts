import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Offer } from './offer.entity';

@Controller('offer')
@UseGuards(JWTAuthGuard)
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  create(@Body() newOffer: CreateOfferDto) {
    return this.offerService.create(newOffer);
  }

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    const offer = await this.offerService.findOne(id);
    return offer;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOfferDto: UpdateOfferDto,
  ): Promise<Offer> {
    const offer = await this.offerService.findOne(id);
    return this.offerService.update(offer, updateOfferDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    const offer = await this.offerService.findOne(id);
    return this.offerService.remove(offer);
  }
}
