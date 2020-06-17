const axios = require("axios");

async function getTweets(query, count) {
    
    const encodedQuery = encodeURIComponent(query);

    const config = {
        method: "get",
        url: `https://api.twitter.com/1.1/search/tweets.json?q=%23${encodedQuery}&count=${count}`,
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            Cookie:
                'personalization_id="v1_XHkEAUvtuhkJoAGrYd2duA=="; guest_id=v1%3A159237933438839587',
        },
    };

    const res = await axios(config);
    const tweets = res.data.statuses;

    let filteredData = [];

    tweets.forEach((tweet) => {
        let obj = {
            created_at: tweet.created_at,
            text: tweet.text,
        };
        filteredData.push(obj);
    });

    return filteredData;
}

module.exports = getTweets;