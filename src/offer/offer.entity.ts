import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: string;

  @Column()
  eta: string;
}
