const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, username, email, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: "Muvaffaqiyatli ro'yxatdan o'tdingiz!" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({
            $or: [
                { username: login },
                { email: login }
            ]
        });
        if (!user) {
            return res.status(401).json({ message: "Bunday foydalanuvchi topilmadi!" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Parol noto'g'ri!" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Muvaffaqiyatli tizimga kirdingiz!", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { register, login }