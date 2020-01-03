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

    
})