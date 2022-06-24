import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("GET request tester", () => {

    let appController: AppController;
    let appService: AppService;

    beforeEach(() => {
        appService = new AppService();
        appController = new AppController(appService);
    })

    describe("getHello", () => {
        it("simple return string", () => {
            const result = appController.getHello();
            expect(result).toBe("Hello World!")
        })
    })
})