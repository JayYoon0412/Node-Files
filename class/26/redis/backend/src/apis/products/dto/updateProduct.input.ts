import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
//Partial Type은 부모 클래스 변수들을 nullable: true로 변경해줌.
export class UpdateProductInput extends PartialType(CreateProductInput) {}

//PartialType외에 많이 사용되는 Utility Type들:
//PickType(CreateProductInput, ["name", "price"])
//OmitType(CreateProductInput, ["description"])
