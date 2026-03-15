require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB", process.env.MONGO_URL))
    .catch((err) => console.log(err));

const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const reviewRoutes = require("./routes/reviews");
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Kino API",
            version: "1.0.0",
            description: "Kino boshqaruv tizimi"
        },
        servers: [
            { url: `http://localhost:${process.env.PORT}` }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./routes/*.js"]
};

swaggerDocument = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server is running `);
});