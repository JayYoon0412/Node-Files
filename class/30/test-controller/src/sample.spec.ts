
//간단한 연산자 테스트 예제
describe("simple operation test", () => {
    it("sample addition test", () => {
        const a = 1;
        const b = 2;
        expect(a+b).toBe(3);
    });

    it("sample multiplication test", () => {
        const a = 3;
        const b = 2;
        expect(a*b).toBe(6);
    });
})

//상품 구매하기 테스트 예제
describe("sample payment test", () => {

    beforeEach(() => {
        //각각의 테스트 전에 먼저 로그인 필요
        //로그인하는 로직 작성
    })

    it("balance check", () => {
        //돈 검증 (따로따로 검증한다)
        const result = true; //API에서 받아온 실제 값
        expect(result).toBe(true); //예상하는 값
    })

    it("payment process check", () => {
        //결제 과정 검증 (독립적 테스트)
        const result = true;
        expect(result).toBe(true);
    })
})