const axios = require("axios");

async function getTweets(query, count) {        
    let tweets = []
    const encodedQuery = encodeURIComponent(query)
    const endpoint = `https://api.twitter.com/1.1/search/tweets.json`
    
    let params = `?include_entities=0` + `&count=${count}` + `&q=%23${encodedQuery}`

    do {
        console.log("query: " + params)
        const url = endpoint + params

        let config = {
            method: "get",
            url: url,
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                Cookie: 'personalization_id="v1_XHkEAUvtuhkJoAGrYd2duA=="; guest_id=v1%3A159237933438839587'
            }
        }
    
        let res = await axios(config)
        tweets = tweets.concat(res.data.statuses)
        count = count - 100
        params = res.data.search_metadata.next_results.replace(`?max`, `?include_entities=0&count=${count}&max`)
   
    } while (count > 0 )

    let filteredData = []

    tweets.forEach(tweet => {
        let obj = {
            created_at: tweet.created_at,
            text: tweet.text
        }
        filteredData.push(obj)
    })

    // console.log(filteredData)
    return filteredData
}

module.exports = getTweets