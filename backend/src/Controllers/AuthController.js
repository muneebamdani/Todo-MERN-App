const User = require("../models/AuthSchema");
const bcrypt = require("bcryptjs");

const Singup = async (req, res) => {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(401).json({ error: "all fields are requried" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ error: "User already registered with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save()

        res.status(201).json({ message: "User Created successfuly"});
    } catch (error) {
         res.status(500).json({ error: "Error Creating User", message: error});
    }
}


module.exports = {
    Singup
}