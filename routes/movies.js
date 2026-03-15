const express = require("express");
const router = express.Router();
const { getAllMovies, getMovieById, deleteMovieById, updateMovieById, createMovie, getMoviesByGenre } = require("../controllers/moviesController")
const authMiddleware = require("../middleware/authMiddleware")

/**
 * @swagger
 * /movies/all:
 *   get:
 *     summary: Barcha kinolarni olish
 *     responses:
 *       200:
 *         description: Kinolar ro'yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/all", getAllMovies)

/**
 * @swagger
 * /movies/id/{id}:
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
router.get("/id/:id", getMovieById)

/**
 * @swagger
 * /movies/add:
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
router.post("/add", authMiddleware, createMovie)

/**
 * @swagger
 * /movies/id/{id}:
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
router.put("/id/:id", authMiddleware, updateMovieById)

/**
 * @swagger
 * /movies/id/{id}:
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
router.delete("/id/:id", authMiddleware, deleteMovieById)

/**
 * @swagger
 * /movies/genre/{genre}:
 *   get:
 *     summary: Janr bo'yicha kino olish
 *     parameters:
 *       - in: path
 *         name: genre
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["action", "comedy", "drama", "horror", "animation", "romance", "fantasy"]
 *     responses:
 *       200:
 *         description: Kino topildi
 *       404:
 *         description: Kino topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/genre/:genre", getMoviesByGenre)

module.exports = router