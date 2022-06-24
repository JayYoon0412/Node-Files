import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

class MockAppService {
    getHello() {
        return "Hello World!";
    }
}

describe("GET request tester--mocker", () => {

    let appController: AppController;

    beforeEach(async () => {
        //테스트 전용 Module 만들어주기. @nestjs/testing 패키지 사용.
        const appModule: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: AppService,
                //실제 DB에 접속 안하는 가짜 서비스 버전
                useClass: MockAppService //AppService 자리에 MockAppService로 바꿔줘
            }],
            controllers: [AppController],
        }).compile();
        appController = appModule.get<AppController>(AppController);
    })

    describe("getHello", () => {
        it("simple return string", () => {
            const result = appController.getHello();
            expect(result).toBe("Hello World!")
        })
    })
})