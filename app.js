require('dotenv').config()
const express = require('express')
const app = express()
const converter = require('json-2-csv')
const getTweetsAsync = require("./util/getTweets.js")

app.get("/", (req, res) => res.sendFile("index.html", { root: __dirname }))

app.get('/getTweet', async (req, res) => {    

    const query = req.query.query
    const count = req.query.count

    const data = await getTweetsAsync(query, count)
    const csvData = await converter.json2csvAsync(data)

    res.setHeader('Content-disposition', `attachment; filename=tweets_${query}_${count}.csv`);
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))
