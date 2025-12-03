const OMDB_API_KEY = 'fde8a112';
const OMDB_API_URL = 'https://www.omdbapi.com/';

const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");
const resultsContainer = document.querySelector(".results")
const loadingMessage = document.querySelector(".loading");
const errorMessage = document.querySelector(".error");

// SearchInput = text box where you type a movie
// searchBtn = the button you click to start searching
// resultsContainer = the box where all the movie cards will go
// loadingMessage = a message like "Loading..." while we wait
// errorMessage = a place to show error messages


function showLoading(isLoading) {
    loadingMessage.style.display = isLoading ? "flex" : "none";
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}


// EVENT LISTENERS
searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        searchMovies();
        
    }
});

// MAIN PAGE SEARCH FUNCTION 
function searchMovies() {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        showError("Don't forget to enter a movie title 😎 ");
        return;
    }
    fetchMovies(searchTerm);
}


async function fetchMovies (searchTerm) {
    try {
        showLoading(true);
        clearError();
        resultsContainer.innerHTML = '';
        
        const url = `${OMDB_API_URL}?s=${encodeURIComponent(searchTerm)}&type=movie&apikey=${OMDB_API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network not responding');
        }
        
        const data = await response.json();
        
        showLoading(false);
        
        if(data.Response === 'False') {
            showError('No movies found. Try a different search term 😎');
            return;
        }
        
        displayMovies(data.Search);
    }

    catch (error) {
        showLoading(false);
        showError('Error fetching movies: ' + error.message);
        console.error(error);
    }
}

function displayMovies (movies) {
    resultsContainer.innerHTML = ""
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        resultsContainer.appendChild(movieCard);
        movieCard.className = "movie-card";
        movieCard.innerHTML = `
                        <img class="poster" src="${movie.Poster}">
                        <div class="movie-info">
                            <h2 class="title">${movie.Title}</h2>
                            <p class="year">${movie.Year}</p>
                        </div>`
    })
}





