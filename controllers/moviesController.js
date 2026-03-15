const Movie = require("../models/Movies");
const authMiddleware = require("../middleware/authMiddleware");
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie) {
            return res.status(404).json({ error: "Kino topilmadi" })
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteMovieById = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Ruxsat yo'q! Faqat admin o'chira oladi." })
        }

        const movie = await Movie.findByIdAndDelete(req.params.id)
        if (!movie) {
            return res.status(404).json({ error: "Kino topilmadi" })
        }
        res.status(200).json({ message: "Kino o'chirildi" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateMovieById = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Ruxsat yo'q! Faqat admin o'zgartira oladi." })
        }
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!movie) {
            return res.status(403).json({ error: "Kino topilmadi!" })
        }
        res.status(200).json({ message: "Kino o'zgartirildi!" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createMovie = async (req, res) => {
    console.log(req.user.role)
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Ruxsat yo'q! Faqat admin qo'sha oladi." })
        }
        const { title, description, genre, year } = req.body
        const movie = new Movie({ title, description, genre, year })
        await movie.save()
        res.status(201).json(movie)
    } catch (error) {
        const genre = Movie.schema.path("genre").enumValues
        res.status(500).json({ error: error.message, message: genre });
    }
}

module.exports = { getAllMovies, getMovieById, deleteMovieById, updateMovieById, createMovie }