const express = require('express')
const router = express.Router()
const { signUp, signIn, signOut } = require('../controllers/auth')

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signout', verifyToken, signOut)

module.exports = router