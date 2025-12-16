import express from 'express'

const router = express.Router()

router.post('/register', (req, res) => {
    res.sendStatus(201)
})

export default router;