import express from 'express'
import db from '../db.js'

const router = express.Router()

// Get all todos for logged-in user
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    // console.log("Get all todos")
    res.json(todos)
})

// Create a new todo
router.post('/', (req, res) => {
    const { task } = req.body
    if (!task) { return res.status(401).json({ message: "No task provided" }) }
    try {
        const insertTodo = db.prepare('INSERT INTO todos (user_id, task) VALUES (?, ?)')
        const result = insertTodo.run(req.userId, task)
        //  `res.sendStatus(201)` is equivalent to 👇
        //  `res.status(201).send('Created')`
        return res.sendStatus(201)
    } catch (error) {
        console.log(error.message)
        return res.status(501).json({ message: "Server error" })
    }
})

// Update a todo
router.put('/:id', (req, res) => {

})

// Delete a todo
router.delete('/:id', (req, res) => {

})

export default router