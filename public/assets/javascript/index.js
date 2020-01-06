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
            articleCards.push(createCard(articles[i]));
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

    function renderEmpty() {
        // renders some HTML to page explaining no articles avail. to view
        // uses a joined array of HTML string data because it's easier to read/change than a concatentated string
        let emptyAlert = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
                "</div>",
                "<div class='card'>",
                "<div class='card-header text-center'>",
                "<h3>What Would You Like To Do?</h3>",
                "</div>",
                "<div class='card-body text-center'>",
                "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );
        // Append this data to the page
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        // Triggered when the user want to save an article
        // When article is rendered intially, a js obj. with the headline id to the element using the .data method. It is retreived here
        let articleToSave  = $(this)
            .parents(".card")
            .data();

        // Remove card from page
        $(this)
            .parents(".card")
            .remover();
        
        articleToSave.saved = true;
        // using a patch method to be semantic since this is an update to an eisting record in our collection 
        $.ajax({
            method: "PUT",
            url: "/api/headlines/" + articleToSave._id,
            data: articleToSave
        }).then(function(data) {
            // If the data was saved successfully
            if (data.saved) {
                // Run the init page function again to reload the entire list of articles
                initPage();  
            }
        });
    }

    function handleArticleScrape() {
        // This function handles the user clicking "scrape new article" buttons
        $.get("/api/fetch").then(function(data) {
            // Once scraped, re-render the articles on the page and let user know how many were saved
            initPage();
            bootbox.alert($("<h3 class='text-center m-top-80>").text(data.message));
        });
    }

    function handleArticleClear() {
        $.get("api/clear").then(function() {
            articleContainer.empty();
            initPage();
        });
    }
});