export class ProductController {

    constructor(moneyService, productService) {
        this.moneyService = moneyService
        this.productService = productService
    }

    buyproduct = (req, res) => {
        // 1. 구매자가 가진 돈을 검증 (돈이 충분히 있는지 확인)하는 코드
        const hasMoney = this.moneyService.checkValue()
        // 2. 그 중고상품의 판매여부를 검증하는 코드
        const isSoldOut = this.productService.checkSoldOut()
        // 3. 상품을 구매하는 코드 (1,2 조건 만족하면)
        if (hasMoney && !isSoldOut) res.send("상품을 구매합니다")
    }

    refundproduct = (req, res) => {
        // 1. 그 중고상품의 판매여부를 검증하는 코드, 환불 받으려면 팔렸어야 한다
        const isSoldOut = this.productService.checkSoldOut()
        // 2. 상품을 환불하는 코드 (1조건 만족하면))
        if (isSoldOut) res.send("환불을 진행합니다")
        else res.send("아직 상품이 팔리지 않았습니다. 이 상품이 확실합니까?")
    }

}