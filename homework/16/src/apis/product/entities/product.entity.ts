import { Category } from '../../category/entities/category.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cost: number;

  @Column()
  uploadDate: Date;

  @ManyToOne(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => Payment)
  payment: Payment;

  @JoinTable()
  @ManyToMany(() => Category, (categories) => categories.products)
  categories: Category[];
}
