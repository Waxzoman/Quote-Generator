// Get Quotes From API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true; 
};

function newQuote() {
    showLoadingSpinner();
    //pick a random quote from apiQuote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author field is blank and replace it with unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    };
    //Check the quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')        
    }
    //Set te quote, hide loader
    removeLoadingSpinner();
    quoteText.textContent = quote.text;
    
};
    
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (e) {
        console.log('Something went wrong', e);
        getQuotes();
    }
};

//Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
newQuotebtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On Load
getQuotes();
