/**
 * @swagger
 * /boards:
 *   get:
 *     summary: load board posts
 *     parameters: 
 *          - in: query
 *            name: number
 *            type: int
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *              schema: 
 *                  type: array
 *                  items: 
 *                      properties:
 *                          number:
 *                              type: int
 *                              example: 1
 *                          writer:
 *                              type: string
 *                              example: Bob
 *                          title:
 *                              type: string
 *                              example: Post Title One
 *                          contents:
 *                              type: string
 *                              example: Content Number One
 */

/**
 * @swagger
 * /boards:
 *   post:
 *      summary: posting new board
 *      responses:
 *          200:
 *              description: success
 */