$(document).ready(function() {
    // Set reference to article-container div where dynamic content goes 
    // add event listeners to any dynamically generated "save article" and "scrape new article" buttons

    let articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
    $(".clear").on("click", handleArticleClear);

    function initPage() {
        // Run an AJAX request for any unsave headlines
        $.get("/api/headlines?saved=false").then(function(data) {
            articleContainer.empty();
            // if we have headlines, render them to page
            if (data && data.length) {
                renderArticles(data);
            } else {
                // Otherwise render a message explaining we have no artcles
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        // This function handles appending HTML with our article data to the page
        // array of JSOn containing all avail. articles in our DB
        let articleCards = [];
        // pass each article JSOn obj. to the createCard function that returns bootstrap card with article data 
        for (let i = 0; i < articles.length; i++) {
            articleCards.push(createCard(articles[i]))
        }
        // once we have all HTML for articles stored in articleCards array, append them to the articleCards container
        articleContainer.append(articleCards);
    }

    function createCard(article) {
        // This function takes in a single JSON object for an article/headline
        // Then constructs a jQuery element with the formatted HTML for aricle card
        let card = $("<div class='card'>");
        let cardHeader = $("<div class='card-header'>").append(
            $("<h3>").append(
                $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
                    .attr("href", article.url)
                    .text(article.headline),
                $("<a class='btn btn-success save'>Save Article</a>")
            )
        );

        let cardBody = $("<div class='card-body'>").text(article.summary);

        card.append(cardHeader, cardBody);
        // attach article's id to the jQuery element and use when tryuing to figure out which article the user wants to save
        card.data("_id", article._id);
        // return constructed card jQuery element
        return card;
    }

});