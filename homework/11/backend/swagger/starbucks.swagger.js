/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 모든 스타벅스 음료 정보 불러오기
 *     tags: [Starbucks]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *            application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          _id:
 *                              type: string
 *                              example: "6289fde9da6e1aefd62419ef"
 *                          name:
 *                              type: string
 *                              example: "나이트로 바닐라 크림"
 *                          img:
 *                              type: string
 *                              example: "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg"
 *                          __v:
 *                              type: int
 *                              example: 0
 */