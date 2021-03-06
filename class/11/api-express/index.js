import express from 'express'

const app = express()

//상품 구매하기 API
app.post("/products/buy", (req, res) => {
    // 1. 구매자가 가진 돈을 검증 (돈이 충분히 있는지 확인)하는 코드 (대략 10줄이라고 하자)
    // ... => 돈 처리해주는 클래스 하나
    // ...
    // ...
    // 2. 그 중고상품의 판매여부를 검증하는 코드 (대략 10줄이라고 하자)
    // ...=> 상품처리 클래스 하나
    // ...
    // ...
    // 3. 상품을 구매하는 코드 (1,2 조건 만족하면)
    // ...
    // ...
    // ...
    res.send("purchase successful")
})

//구매한 상품 환불하기 API
app.post("/products/refund", (req, res) => {
    // 1. 그 중고상품의 판매여부를 검증하는 코드, 환불 받으려면 팔렸어야 한다
    // ...
    // ...
    // ...
    // 2. 상품을 환불하는 코드 (1조건 만족하면))
    // ...
    // ...
    // ...
    res.send("refund successful")
})



app.listen(5500, ()=>{
    console.log("Listening to port 5500...")
})