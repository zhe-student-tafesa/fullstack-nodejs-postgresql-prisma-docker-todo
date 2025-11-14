// Address of this server: 
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383
import express from "express"

const app = express()
const PORT = 8383

// mock DB
let data = ["Frank"]

// use middleware to config SERVER
app.use(express.json())

// HTTP Verb && Roures (or paths)
app.get('/', (req, res) => {
    console.log(`Server get / `, req.method)
    // JSON.stringify is used to convert an object into a displayable string.
    res.send(`
        <body style="background:pink; color: blue">
            <h1>This is Homepage</h1>
            <p>${JSON.stringify(data)}</p>
        <body>
        `)
})

app.get('/try-string', (req, res) => {
    console.log(`Server try-string `, req.method)
    res.send("Hi")
})
// Type 1 - Website endpoints
app.get('/try-html', (req, res) => {
    console.log(`Server try-string `, req.method)
    res.send('<h1>This is a website (html code)</h1><input/>')
})
// Type 2 - API endpoints (non visual)  : best practice, with '/api'
// like login POST request, or get data
app.get('/api/data', (req, res) => {
    console.log('This is for data')
    res.send(data)
})

app.post('/api/data', (req, res) => {
    const newEntry = req.body;
    console.log(newEntry)
    // mock: save to DB
    data.push(newEntry.name)
    res.sendStatus(201)
})

app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`)
})