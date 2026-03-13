// Review (movie, user, comment, rating)
// → Sharh (kino, foydalanuvchi, izoh, baho)

const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    comment: {
        type: String,
        maxlength: 500
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        required: true,
        default: 0
    }
}, { timestamps: true });

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;