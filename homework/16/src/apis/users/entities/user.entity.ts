import { UserArea } from '../../userArea/entities/userArea.entity';
import { UserTemp } from '../../userTemp/entities/userTemp.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => UserTemp)
  temperature: UserTemp;

  @JoinTable()
  @ManyToMany(() => UserArea, (areas) => areas.users)
  areas: UserArea[];
}
