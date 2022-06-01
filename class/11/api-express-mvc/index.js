import express from 'express'
import { ProductController } from './src/controllers/product.controller.js'
import { CouponController } from './src/controllers/coupon.controller.js'

const app = express()

const productController = new ProductController()
app.post("/products/buy", productController.buyproduct)
app.post("/products/refund", productController.refundproduct)

const couponcontroller = new CouponController()
app.post("/coupons/buy", couponcontroller.buycoupon)

app.listen(5500, ()=>{console.log("Listening to port 5500...")})