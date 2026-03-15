const express = require("express")
const router = express.Router()
const { createComment, getReviews, deleteReview } = require("../controllers/reviewsController")
const authMiddleware = require("../middleware/authMiddleware")

/**
 * @swagger
 * /reviews/createComment:
 *   post:
 *     summary: Kino uchun izoh va rating qoldirish
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movie
 *               - rating
 *             properties:
 *               movieId:
 *                 type: string
 *                 example: 665f1c8f2c9f3a1a9c111111 kino id
 *               comment:
 *                 type: string
 *                 example: Juda zo'r kino ekan
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 10
 *                 example: 8
 *     responses:
 *       201:
 *         description: Izoh qoldirildi
 *       403:
 *         description: Faqat user izoh qoldira oladi
 *       404:
 *         description: Kino topilmadi
 *       500:
 *         description: Server xatosi
 */
router.post("/createComment", authMiddleware, createComment)

/**
 * @swagger
 * /reviews/all:
 *   get:
 *     summary: Barcha izohlarni olish
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Izohlar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/all", getReviews)

/**
 * @swagger
 * /reviews/deleteReview/{id}:
 *   delete:
 *     summary: Izohni o'chirish
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Izoh o'chirildi
 *       403:
 *         description: Faqat admin o'chira oladi
 *       404:
 *         description: Izoh topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/deleteReview/:id", authMiddleware, deleteReview)

module.exports = router