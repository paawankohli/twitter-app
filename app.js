require('dotenv').config()
const express = require('express')
const app = express()
const converter = require('json-2-csv')
const getTweetsAsync = require("./util/getTweets.js")
const fs = require('fs')

app.get("/", (req, res) => res.sendFile("index.html", { root: __dirname }))

app.get('/getTweet', async (req, res) => {
    const query = req.query.query
    const count = req.query.count

    console.log("Request: ", query, count)
    
    const data = await getTweetsAsync(query, count)
    const csvData = await converter.json2csvAsync(data)

    res.setHeader('Content-disposition', 'attachment; filename=tweets.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData)

    // fs.writeFileSync('tweets.csv', csvData)
    // res.redirect("/tweets.csv", { root: __dirname })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))
