const express = require("express");
const router = express.Router();
const { getAllMovies, getMovieById, deleteMovieById, updateMovieById, createMovie } = require("../controllers/moviesController")
const authMiddleware = require("../middleware/authMiddleware")

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Barcha kinolarni olish
 *     responses:
 *       200:
 *         description: Kinolar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/", getAllMovies)

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: ID bo'yicha kino olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kino topildi
 *       404:
 *         description: Kino topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/:id", getMovieById)

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Yangi kino qo'shish (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: number
 *     responses:
 *       201:
 *         description: Kino qo'shildi
 *       403:
 *         description: Ruxsat yo'q
 *       500:
 *         description: Server xatosi
 */
router.post("/", authMiddleware, createMovie)

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Kino o'zgartirish (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: number
 *     responses:
 *       200:
 *         description: Kino o'zgartirildi
 *       403:
 *         description: Ruxsat yo'q
 *       404:
 *         description: Kino topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/:id", authMiddleware, updateMovieById)

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Kino o'chirish (admin)
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
 *         description: Kino o'chirildi
 *       403:
 *         description: Ruxsat yo'q
 *       404:
 *         description: Kino topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/:id", authMiddleware, deleteMovieById)

module.exports = router