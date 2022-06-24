import { ConflictException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserService } from "../user.service";

class MockUserRepository {
    mockDB = [
        {
          email: 'a@a.com',
          password: '0000',
          name: '짱구',
          age: 8,
        },
      ];

    findOne({ email }) {
        return this.mockDB.find((element) => element.email === email);
    }

    save(data: any) {
        this.mockDB.push(data);
        return data;
    }
}

//커스텀 type을 만든건데, 그게 뭐냐면..
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
//T가 제네릭, 만약 없다면 any로 지정.
//keyof는 union type으로 빼는데, 이때 뭐 "create" | "update" | "findOne" 등으로
//jest.Mock: 각각의 키에 다가 매칭 시킬거다 어떤 타입으로? 가짜로
//결국에는 .create와 .save등이 다 가짜로 치환된거다
//그리고 이런 기능들은 Partial (또는 optional) 있을수도 있고 없을수도 있는.

describe("UserService", () => {
    let userService: UserService;
    let userRepository: MockRepository<User>;

    beforeEach(async () => {
        const userModule: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: MockUserRepository
                }
            ]
        }).compile();
        userService = userModule.get<UserService>(UserService)
        userRepository = userModule.get<MockRepository<User>>(getRepositoryToken(User));
    });

    describe("createUser", () => {
        it("Duplicate Email Check", async() => {
            const userSpyFindOne = jest.spyOn(userRepository, "findOne");
            const userSpySave = jest.spyOn(userRepository, "save");

            const userData = {
                email: 'a@a.com',
                hashedPassword: '0000',
                name: '짱구',
                age: 8,
            };
            try {
                await userService.create({...userData});
            } catch(error) {
                expect(error).toBeInstanceOf(ConflictException);
            }
            expect(userSpyFindOne).toBeCalledTimes(1);
            expect(userSpySave).toBeCalledTimes(0);
        })
        it ("Successful User Register Check", async() => {
            const userSpyFindOne = jest.spyOn(userRepository, "findOne");
            const userSpySave = jest.spyOn(userRepository, "save");

            const userData = {
                email: 'b@b.com',
                hashedPassword: '0000',
                name: '훈이',
                age: 8
            };

            const resultData = {
                email: 'b@b.com',
                password: '0000',
                name: '훈이',
                age: 8
            };

            const result = await userService.create({...userData});
            expect(result).toStrictEqual(resultData);
            //객체나 배열, reference object는 toStrictEqual 사용!!

            expect(userSpyFindOne).toBeCalledTimes(1);
            expect(userSpySave).toBeCalledTimes(1);
        })
    })

})