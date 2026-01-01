import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import db from '../db.js'
import prisma from '../prismaClient.js'

const router = express.Router()

// Backtend 02
// Register a new user endpoint /  auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    // console.log(username, password)
    // Save user name and an irreversibly encrypted password 
    // To DB

    // encrypt the password 
    const hashedPassword = bcrypt.hashSync(password, 8)
    // console.log(hashedPassword)

    // // Save user name and hashedPassword to DB 
    try {
        // const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        // const result = insertUser.run(username, hashedPassword)
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword
            }
        })


        // insert a default todo
        const defaultTodo = 'Hello :) Add your first todo!'
        // const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        // insertTodo.run(result.lastInsertRowid, defaultTodo)
        prisma.todo.create({
            data: {
                user_id: user.id,
                task: defaultTodo
            }
        })

        // create a token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }

        )
        // console.log(`token: ${token}`)
        // confirm they are the correct user: 111 pass json to frontend
        res.json({ token: token })
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }

})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // console.log(`login user: ${username}   ${password}  `)
    try {
        // const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        // const user = getUser.get(username)
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        // console.log(`login user: ${user}`)

        if (!user) { return res.status(404).send({ message: "User not found" }) }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) return res.status(401).send({ message: "Invalid password" })

        // successful
        // encode id
        console.log(user)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token: token })

    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }
})

export default router;