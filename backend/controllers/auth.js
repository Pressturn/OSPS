const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const saltRounds = 10

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' })
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET)

        res.status(201).json(
            {
                token,
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    balance: newUser.Balance
                }
            })

    } catch (error) {
        res.status(500).json({ error: 'Signup Failed' })
    }
}

module.exports = { signup }