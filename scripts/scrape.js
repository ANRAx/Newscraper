// SCRAPE SCRIPT
// ====================================================

// require axios and cheerio to make scrapes possible
let axios = require("axios");
let cheerio = require("cheerio");

// Func to scrape the NYT site
let scrape = function() {
    // scrape NYT
    return axios.get("http://www.nytimes.com").then(function(res) {
        let $ = cheerio.load(res.data);
        console.log("scraping...");

        // make an empty array to save article info 
        let articles = [];

        // loop thru each element that has the ".assetWrapper" class that holds the articles
        $(".assetWrapper").each(function(i, element) {
            // Grab headline, URL, and summary of each article
            let head = $(this)
                .find("h2")
                .text()
                .trim();

            // Grab the URL of the article
            let url = $(this)
                .find("p")
                .text()
                .trim();
            let sum = $(this)
                .find("p")
                .text()
                .trim();
            // as long as headline, sum, and url aren't empty or undefined, do:
            if (head && sum && url) {
                // use regex and trim function to tidy up headlines and summaries 
                let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                let dataToAdd = { 
                    headline: headNeat,
                    summary: sumNeat,
                    url: "https://www.nytimes.com" + url
                };

                // push new article into articles array 
                articles.push(dataToAdd);
            }
        });
        return articles;
    });
};

// Export func so other files in backend can use 
module.exports = scrape;