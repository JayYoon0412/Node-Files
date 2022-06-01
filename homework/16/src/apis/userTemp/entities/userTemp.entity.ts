import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserTemp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  temp: string;
}
