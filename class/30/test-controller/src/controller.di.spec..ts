import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("GET request tester", () => {

    let appController: AppController;

    beforeEach(async () => {
        //테스트 전용 Module 만들어주기. @nestjs/testing 패키지 사용.
        const appModule: TestingModule = await Test.createTestingModule({
            providers: [AppService],
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