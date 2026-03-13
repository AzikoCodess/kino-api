// Movie (title, description, genre, rating, year)
// → Kino (nomi, tavsifi, janri, reytingi, yili)

const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 300
    },
    genre: {
        type: String,
        enum: ["action", "comedy", "drama", "horror", "animation", "romance", "fantasy"]
    },
    
    year: {
        type: Number,
        min: 1888,
        max: new Date().getFullYear(),
        default: new Date().getFullYear()
    }
}, { timestamps: true });

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;