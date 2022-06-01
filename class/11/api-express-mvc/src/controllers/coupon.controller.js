import { CashService } from "./services/cash.service.js";

export class CouponController {

    buycoupon (req, res) {
        const cashService = new CashService()
        const hasMoney = cashService.checkValue()
        if (hasMoney) res.send("쿠폰을 구매합니다.")
    }

}