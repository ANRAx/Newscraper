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

    function createCard(article) {
        // takes single JSON object for art/headline, constructs a jQuery element with all formatted HTML for the art. card
        let card = $("<div class='card'>");
        let cardHeader = $("<div class='card-header'>").append(
            $("<h3>").append(
                $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
                    .attr("href", article.url)
                    .text(article.headline),
                $("<a class='btn btn-danger delete'>Delete From Saved</a>"),
                $("<a class='btn btn-info notes'>Article Notes</a>")
            )
        );

        let cardBody = $("<div class='card-body'>").text(article.summary);

        card.append(cardHeader, cardBody);

        // attach art. id to jQuery element (used when trying to figure out which article user wants to remove or open notes for)
        card.data("_id", article._id);
        // return constructed card jQUery element
        return card;
    }

    function renderEmpty() {
        // renders some HTML to page explaining no articles avail. to view
        // uses a joined array of HTML string data because it's easier to read/change than a concatentated string
        var emptyAlert = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4>Uh Oh. Looks like we don't have any saved articles.</h4>",
                "</div>",
                "<div class='card'>",
                "<div class='card-header text-center'>",
                "<h3>Would You Like to Browse Available Articles?</h3>",
                "</div>",
                "<div class='card-body text-center'>",
                "<h4><a href='/'>Browse Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );
        // Appending this data to the page
        articleContainer.append(emptyAlert);
    }

    function renderNotesList(data) {
        // This function handles rendering note list items to our notes modal
        // Setting up an array of notes to render after finished
        // Also setting up a currentNote variable to temporarily store each note
        let notesToRender = []; 
        let currentNote;
        if (!data.notes.length) {
            // If we have no notes, just display a message explaining this
            currentNote = $("<li class='list-group-item'>No notes for this article yet.</li>");
            notesToRender.push(currentNote);
        } else {
            // If we do have notes, go through each one
            for (let i = 0; i < data.notes.length; i++) {
                // Constructs an li element to contain our noteText and a delete button
                currentNote = $("<li class='list-group-item note'>")
                    .text(data.notes[i].noteText)
                    .append($("<button class='btn btn-danger note-delete'>x</button>"));
                // Store the note id on the delete button for easy access when trying to delete
                currentNote.children("button").data("_id", data.notes[i]._id);
                // Adding our currentNote to the notesToRender array
                notesToRender.push(currentNote);
            }
        }
        // Now append the notesToRender to the note-container inside the note modal
        $(".note-container").append(notesToRender);
    }

    function handleArticleDelete() {
        // handles deleting articles/headlines by grabbing id of arts to delete from the card element the delete btn sits inside 
        let articleToDelete = $(this)
            .parents(".card")
            .data();

        // Remove card from page 
        $(this)
            .parents(".card")
            .remove();
        
        // Using a delete method here just to be semantic since we are deleting and article/headline 
        $.ajax({
            method: "DELETE",
            url: "/api/headlines/" + articleToDelete._id
        }).then(function(data) {
            // If it works properly, re-render our list of saved articles 
            if (data.ok) {
              initPage();
            }
        });
    }

    
});