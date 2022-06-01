import express from 'express'
import { ProductController } from './src/controllers/product.controller.js'
import { CouponController } from './src/controllers/coupon.controller.js'
import { CashService } from './src/controllers/services/cash.service.js'
import { ProductService } from './src/controllers/services/product.service.js'
import { PointService } from './src/controllers/services/point.service.js'

const app = express()

const cashService = new CashService()
const productService = new ProductService()
const pointService = new PointService()

const productController = new ProductController(cashService, productService)
app.post("/products/buy", productController.buyproduct)
app.post("/products/refund", productController.refundproduct)

const couponcontroller = new CouponController(pointService)
app.post("/coupons/buy", couponcontroller.buycoupon)

app.listen(5500, ()=>{console.log("Listening to port 5500...")})