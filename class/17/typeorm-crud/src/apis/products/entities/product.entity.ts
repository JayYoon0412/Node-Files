import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/user/entities/user.entity';
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
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn() //연결이 핵심이 되는 컬럼임.
  @OneToOne(() => ProductSaleslocation) //무엇이랑 연결을 할 것인가
  @Field(() => ProductSaleslocation)
  location: ProductSaleslocation;

  @ManyToOne(() => ProductCategory) //상품 기준으로, 하나의 카테고리에 많은 상품
  @Field(() => ProductCategory)
  catgory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  //다대다에서 중간 테이블은 자동생성됨. 각자 클래스에서 각각 만들어줘야함.
  //두번째 인자: 반대로, productTags에서는 어떻게 나를 뭐라고 하고 있는가 (어떤 변수로 저장?)
  //p.s. 매개변수를 뭐라고 하던 상관은 없다 (여기서는 괄호 안의 tags)
  @JoinTable()
  @ManyToMany(() => ProductTag, (tags) => tags.products)
  @Field(() => [ProductTag])
  tags: ProductTag[];
}
