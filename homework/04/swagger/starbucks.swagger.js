/**
 * @openapi
 * /starbucks:
 *    get:
 *      summary: 커피 메뉴 리스트 가져오기
 *      tags: [Starbucks]
 *      responses:
 *         200:
 *            description: success
 *            content:
 *               application/json:
 *                  schema: 
 *                      type: array
 *                      items: 
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: 콜드브루
 *                              kcal:
 *                                  type: int
 *                                  example: 5

 */