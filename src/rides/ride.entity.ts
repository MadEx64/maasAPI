import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  aggregator: string;
}
