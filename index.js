const port = process.env.port || 8000;
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const articles = [];

const webpages = [
    {
        name: "TV Guide",
        address: "https://www.tvguide.com"
    },
    {
        name: "TV Fanatatic",
        address: "https://www.tvfanatic.com"
    },
    {
        name: "TVLine",
        address: "https://tvline.com/"
    },
    {
        name: "Spoiler TV",
        address: "https://spoilertv.com"
    },
    {
        name: "Reality Steve",
        address: "https://realitysteve.com"
    },
    {
        name: "Monsters And Critics",
        address: "https://www.monstersandcritics.com"
    },
    {
        name: "Roku",
        address: "https://www.roku.com/blog/en-gb"
    },
    {
        name: "TV Insider",
        address: "https://www.tvinsider.com"
    },
    {
        name: "Channel Guide Magazine",
        address: "https://www.channelguidemag.com"
    },
    {
        name: "TV Show Pilot",
        address: "https://tvshowpilot.com"
    },
    {
        name: "TV Source Magazine",
        address: "https://tvsourcemagazine.com"
    },
    {
        name: "CinemaBlend",
        address: "https://www.cinemablend.com/television"
    },
    {
        name: "The TV Addict",
        address: "https://www.thetvaddict.com"
    },
    {
        name: "Paul Levinson @ Blogspot",
        address: "https://paullevinson.blogspot.com"
    },
    {
        name: "TV Cream",
        address: "https://www.tvcream.co.uk"
    },
    {
        name: "Streaming TV",
        address: "https://streaming-tv.net"
    },
    {
        name: "What To Watch",
        address: "https://www.whattowatch.com"
    },
    {
        name: "TV-aholic @ Blogspot",
        address: "https://tvaholics.blogspot.com"
    },
    {
        name: "The Post Credit Scene w/ Aubrey & Emilie",
        address: "https://thepostcreditscene.com"
    },
    {
        name: "The Wrap",
        address: "https://www.thewrap.com/category/tv/"
    },
    {
        name: "Film Book",
        address: "https://film-book.com/category/tv/television/"
    },
    {
        name: "JoBlo",
        address: "https://www.joblo.com/tv/"
    },
    {
        name: "TV Guide/News",
        address: "https://www.tvguide.com/news/"
    },
    {
        name: "BBC",
        address: "https://www.bbc.com/news/world_radio_and_tv"
    },
    {
        name: "Tom's Guide",
        address: "https://www.tomsguide.com/news/new-tv-shows"
    },
    {
        name: "itv",
        address: "https://www.itv.com/news"
    },
    {
        name: "The Hollywood Reporter",
        address: "https://www.hollywoodreporter.com/c/tv/"
    },
    {
        name: "Buzzfeed News",
        address: "https://www.buzzfeednews.com"
    },
    {
        name: "The Sun",
        address: "https://www.thesun.co.uk/tvandshowbiz/"
    },
    {
        name: "Mashable",
        address: "https://mashable.com/category/tv-shows"
    }

]

const app = express();

webpages.forEach(webpage => {
    axios.get(webpage.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Squid")', html).each(function() {

                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url,
                    source: webpage.name
                })
            })
        })
})

app.get('/', (req, res) => {
    res.json("Welcome to my API about Squid Game");
})

app.get('/squidify', (req, res) => {
    res.json(articles)
})

app.listen(port, () => console.log('server listening on port: ', port))