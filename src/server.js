// Address of this server: 
// URL -> http://localhost:5003
// IP -> 127.0.0.1:5003
import express from "express"
import path, { dirname } from 'path'
import { fileURLToPath } from "url"
import authRouter from './routes/authRoures.js'  // MUST have .js
import todoRouter from './routes/todoRoutes.js'  // MUST have .js

const app = express()
const PORT = process.env.PORT || 5003


// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory name from the file path
const __dirname = dirname(__filename)

// use Middleware to config SERVER
app.use(express.json())
// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets / file. Any requests for the css files will be resolved to the public directory.
app.use(express.static(path.join(__dirname, '../public')))


//Serving up the HTML file from the public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Routes
app.use('/auth', authRouter)
app.use('/todos', todoRouter)

app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`)
})