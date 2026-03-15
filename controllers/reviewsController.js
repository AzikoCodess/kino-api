const Review = require("../models/Review")
const Movie = require("../models/Movies")

const createComment = async (req, res) => {
    try {
        // if (req.params.comment){
        //     return res.status(403).json({ error: "Izohni yangilash kerakmi?"})
        // }
        const { movieId, comment, rating } = req.body
        const isMovie = await Movie.findById(movieId)
        if (!isMovie) {
            return res.status(404).json({ error: "Kino topilmadi!!!" })
        }
        const review = new Review({ movie: movieId, user: req.user.id, comment, rating })
        await review.save()
        res.status(201).json({ message: "Izoh qoldirildi", review })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("user", "name").populate("movie", "title")
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params
        const reviewID = await Review.findById(id)

        if (!reviewID) {
            return res.status(404).json({ error: "Izoh topilmadi!!!" })
        }
        if (req.user.role !== "admin" && req.user.id !== reviewID.user.toString()) {
            return res.status(403).json({ error: "Ruxsat yo'q!" })
        }
        await Review.findByIdAndDelete(id)
        res.status(200).json({ message: "Izoh o'chirildi!!!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createComment, getReviews, deleteReview }
