import { ConflictException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
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

describe("UserService", () => {
    let userService: UserService;
    beforeEach(async () => {
        const userModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: MockUserRepository
                }
            ]
        }).compile();
        userService = userModule.get<UserService>(UserService)
    });

    describe("createUser", () => {
        it("Duplicate Email Check", async() => {
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
        })
        it ("Successful User Register Check", async() => {
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
        })
    })

})