import express from 'express'
import { CashService } from './cash.js'
import { ProductService, ProductService } from './product.js'

const app = express()

//상품 구매하기 API
app.post("/products/buy", function (req, res) {
    // 1. 구매자가 가진 돈을 검증 (돈이 충분히 있는지 확인)하는 코드
    const moneyService = new CashService()
    const hasMoney = moneyService.checkValue()
    // 2. 그 중고상품의 판매여부를 검증하는 코드
    const productService = new ProductService()
    const isSoldOut = productService.checkSoldOut()
    // 3. 상품을 구매하는 코드 (1,2 조건 만족하면)
    if (hasMoney && !isSoldOut) res.send("상품을 구매합니다")
})

//구매한 상품 환불하기 API
app.post("/products/refund", function (req, res) {
    // 1. 그 중고상품의 판매여부를 검증하는 코드, 환불 받으려면 팔렸어야 한다
    const productService = new ProductService()
    const isSoldOut = productService.checkSoldOut()
    // 2. 상품을 환불하는 코드 (1조건 만족하면))
    if (isSoldOut) res.send("환불을 진행합니다")
})

app.listen(5500, ()=>{
    console.log("Listening to port 5500...")
})