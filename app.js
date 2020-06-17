require('dotenv').config()
const express = require('express')
const app = express()

const getTweetsAsync = require("./util/getTweets.js")

app.get("/", (req, res) => res.sendFile("index.html", { root: __dirname }))

app.get('/getTweet', async (req, res) => {
    const query = req.query.query
    const count = req.query.count

    console.log(query, count)
    
    const data = await getTweetsAsync(query, count)
    res.send(data)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))
