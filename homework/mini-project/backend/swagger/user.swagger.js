/**
 * @swagger
 * /user:
 *   post:
 *     summary: 새로운 사용자 등록하기
 *     tags: [User]
 *     requestBody:
 *       description: 입력받은 사용자 정보 (이름, 이메일, 주민번호, 좋아하는 사이트, 비밀번호, 휴대폰번호)
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      name:
 *                          type: string
 *                          example: "철수"
 *                      email:
 *                          type: string
 *                          example: "chulsu@gmail.com"
 *                      personal:
 *                          type: string
 *                          example: "020202-*******"
 *                      prefer:
 *                          type: string
 *                          example: "https://naver.com"
 *                      pwd:
 *                          type: string
 *                          example: "password"
 *                      phone:
 *                          type: string
 *                          example: "01012341234"
 *                      og:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  example: "네이버"
 *                              description:
 *                                  type: string
 *                                  example: "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"
 *                              image:
 *                                  type: string
 *                                  example: "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png"
 * 
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *              schema: 
 *                  type: string
 *                  example: 6289f890626df161ea684bb0
 *
 */