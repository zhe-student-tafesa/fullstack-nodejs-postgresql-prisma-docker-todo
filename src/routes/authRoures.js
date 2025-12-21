import express from 'express'

const router = express.Router()

// Backtend 02
// Register a new user endpoint /  auth/register
router.post('/register', (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    res.sendStatus(201)
})

router.post('/signup', (req, res) => {
    res.sendStatus(201)
})

export default router;