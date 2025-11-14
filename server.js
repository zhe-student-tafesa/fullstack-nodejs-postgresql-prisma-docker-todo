// Address of this server: 
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383
import express from "express"

const app = express()
const PORT = 8383

// HTTP Verb && Roures (or paths)
app.get('/', (req, res) => {
    console.log(`Server get / `, req.method)
    res.sendStatus(200)
})
app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`)
})