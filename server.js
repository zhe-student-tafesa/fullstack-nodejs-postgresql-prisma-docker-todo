// Address of this server: 
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383
import express from "express"

const app = express()
const PORT = 8383
console.log(`Server has not started 123`)
app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`)
})