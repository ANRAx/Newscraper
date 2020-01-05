$(document).ready(function() {
    // get reference to the article container div we will be rendering all articles inside of 
    let articleContainer = $(".article-container");
    // add e listeners for dynamically generated buttons for deleting articles, pulling, saving, and deleting article notes
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);
    $(".clear").on("click", handleArticleClear);

    function initPage() {
        // Empty the article container, run AJAX REQUEST FOR ANY SAVED HEADLINES
        $.get("/api/headlines?saved=true").then(function(data) {
            articleContainer.empty();
            // If we have headlines, render them to the page
            if (data && data.length) {
                renderArticles(data);
            } else {
                // otherwise render a message explaining we have no articles
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        // Handles appending HTML containing our article data to the page, then passes an array of JSON containing all available articles in our DB
        let articleCards = [];

        // pass each article JSON object to createCard function to returm Bootstrap card with our article data inside
        for (let i = 0; i < articles.length; i++) {
            articleCards.push(createCard(articles[i]));
        }

        // once all HTML for articles are stored in artCards array, append to articleCards container
        articleContainer.append(articleCards);
    }

    function createCard(params) {
        
    }
});