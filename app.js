require('dotenv').config()
const express = require('express')
const app = express()
const converter = require('json-2-csv')
const getTweetsAsync = require("./util/getTweets.js")

app.get("/", (req, res) => res.sendFile("index.html", { root: __dirname }))

app.get('/getTweet', async (req, res) => {    
    const data = await getTweetsAsync(req.query.query, req.query.count)
    const csvData = await converter.json2csvAsync(data)

    res.setHeader('Content-disposition', 'attachment; filename=tweets.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))
