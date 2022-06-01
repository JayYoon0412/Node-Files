/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 휴대폰 번호로 인증번호 전송하기
 *     tags: [Token]
 *     requestBody:
 *       description: 인증번호를 받을 휴대폰 번호
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      phone:
 *                          type: string
 *                          example: "01012341234"
 * 
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *              schema: 
 *                  type: string
 *                  example: 01012345678으로 인증 문자가 전송되었습니다.
 *
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *      summary: 인증완료 상태 업데이트하기
 *      tags: [Token]
 *      requestBody:
 *          description: 인증번호를 받은 휴대폰 번호와 입력받은 인증번호 정보
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          phone:
 *                              type: string
 *                              example: "01012341234"
 *                          token:
 *                              type: string
 *                              example: "101010"
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: boolean
 *                          example: true
 */