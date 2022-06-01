import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  payDate: Date;

  @Column()
  payPrice: number;

  @ManyToOne(() => User)
  buyer: User;
}
