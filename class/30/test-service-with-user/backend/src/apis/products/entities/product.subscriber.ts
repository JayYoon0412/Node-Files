import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Product } from "./product.entity";
import { BigQuery } from '@google-cloud/bigquery';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
    
    constructor(connection: Connection) {
        //본 클래스를 구독자 리스트에 등록
        connection.subscribers.push(this);
    }

    listenTo() {
        return Product;
    }

    //Trigger는 보통 sub-logic (main-logic은 따로 처리해줘야 리스크가 적어짐.)
    //로그는 근본적으로 역추적에도 쓰일 수 있고, 이후 처리가 더 편리함. 노트 같은 기능. 이 기록 기반으로 분석이 가능해짐.
    afterInsert(event: InsertEvent<Product>): void | Promise<any> {
        console.log(event); //event.entity.* 에는 등록된 Product 정보가 들어가있음. event는 mysql 데이터

        const bigquery = new BigQuery({
            projectId: 'aerial-yeti-353603',
            keyFilename: 'gcp-bigquery.json'
        })

        bigquery.dataset('bigquerytest').table('productLog').insert([
            //객체 하나당 한 줄 씩 입력, 위의 dataset과 table, 아래의 column들은 직접 미리 만들어줘야함.
            {
                id: event.entity.id,
                name: event.entity.name,
                description: event.entity.description,
                price: event.entity.price,
                isSoldout: event.entity.isSoldout
            }
        ])
    }
}