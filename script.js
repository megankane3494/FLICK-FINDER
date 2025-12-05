const OMDB_API_KEY = 'fde8a112';
const OMDB_API_URL = 'https://www.omdbapi.com/';

const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");
const resultsContainer = document.querySelector(".results")
const loadingMessage = document.querySelector(".loading");
const errorMessage = document.querySelector(".error");
const newReleaseBtn = document.getElementById("newReleasesBtn");
const randomMovie = document.getElementById("movie-generator")

let lastSearchResults = [];

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

randomMovie.addEventListener("click", generateRandomMovie)

// BURGER MENU GENRE DROPDOWN TOGGLE
const burgerGenreDropdowns = document.querySelectorAll(".burger-menu__item .dropdown__btn");
burgerGenreDropdowns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const wrapper = btn.closest(".dropdown__wrapper");
        wrapper.classList.toggle("active");
    });
});


// MAIN PAGE SEARCH FUNCTION 
function searchMovies() {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        showError("Don't forget to enter a movie title 😎 ");
        return;
    }

    localStorage.setItem("lastSearch", searchTerm);

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
    lastSearchResults = movies;
    resultsContainer.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = "movie-card";

        movieCard.innerHTML = `
        <img class="poster" src="${movie.Poster}">
                        <div class="movie-info">
                            <h2 class="title">${movie.Title}</h2>
                            <p class="year">${movie.Year}</p>
                        </div>`;
        
        movieCard.addEventListener("click", () => {
            localStorage.setItem("selectedMovieID", movie.imdbID);
            window.location.href = "movie.html"
        });
        
        resultsContainer.appendChild(movieCard);
       
    })
}



// RANDOM MOVIE GENERATOR
// const randomMovie = document.getElementById("movie-generator")
// randomMovie.addEventListener("click", generateRandomMovie)

async function generateRandomMovie () {
    try {
        showLoading(true);
        clearError();
        resultsContainer.innerHTML = '';

    const RANDOM_MOVIES = [
  "tt0111161", // The Shawshank Redemption
  "tt0068646", // The Godfather
  "tt0071562", // The Godfather Part II
  "tt0468569", // The Dark Knight
  "tt0050083", // 12 Angry Men
  "tt0108052", // Schindler's List
  "tt0167260", // The Lord of the Rings: The Return of the King
  "tt0110912", // Pulp Fiction
  "tt0120737", // The Lord of the Rings: The Fellowship of the Ring
  "tt0060196", // The Good, the Bad and the Ugly
  "tt0137523", // Fight Club
  "tt0109830", // Forrest Gump
  "tt1375666", // Inception
  "tt0167261", // LOTR: The Two Towers
  "tt0133093", // The Matrix
  "tt0099685", // Goodfellas
  "tt0080684", // The Empire Strikes Back
  "tt0073486", // One Flew Over the Cuckoo’s Nest
  "tt6751668", // Parasite
  "tt0816692", // Interstellar
  "tt0110413", // Léon: The Professional
  "tt0114814", // The Usual Suspects
  "tt0120815", // Saving Private Ryan
  "tt0317248", // City of God
  "tt0102926", // The Silence of the Lambs
  "tt0038650", // It's a Wonderful Life
  "tt0120689", // The Green Mile
  "tt0088763", // Back to the Future
  "tt0993846", // The Wolf of Wall Street
  "tt4154796", // Avengers: Endgame
  "tt1853728", // Django Unchained
  "tt0172495", // Gladiator
  "tt0944947", // The Prestige
  "tt0076759", // Star Wars: A New Hope
  "tt0103064", // Terminator 2: Judgment Day
  "tt0082971", // Raiders of the Lost Ark
  "tt0120586", // American History X
  "tt1345836", // The Dark Knight Rises
  "tt0081505", // The Shining
  "tt0268978", // A Beautiful Mind
  "tt0110357", // The Lion King
  "tt0361748", // Inglourious Basterds
  "tt2582802", // Whiplash
  "tt0407887", // The Departed
  "tt2278388", // The Grand Budapest Hotel
  "tt4633694", // Spider-Man: Into the Spider-Verse
  "tt4154756", // Avengers: Infinity War
  "tt2380307", // Coco
  "tt6105098", // The Lion King (2019)
];
const randomMovieId = RANDOM_MOVIES[Math.floor(Math.random() * RANDOM_MOVIES.length)];

const url = `${OMDB_API_URL}?i=${randomMovieId}&apikey=${OMDB_API_KEY}`;
const response = await fetch(url);
const data = await response.json();

showLoading(false);

displayMovies([data]);

}
catch (error) {
    showLoading(false);
    showError("Error fetching random movie: " + error.message);
    console.error(error)
}

}


// SEARCH BY GENRE 



const genreComedy = document.getElementById("comedy");
const genreDrama = document.getElementById("drama");
const genreAction = document.getElementById("action");
const genreMystery = document.getElementById("mystery");

genreComedy.addEventListener("click", generateComedy);

async function generateComedy () {
    if (lastSearchResults.length === 0) {
        showError("Search for movies first!");
        return;
    }

    showLoading(true);
    clearError();
    resultsContainer.innerHTML = "";

    const detailedMovies = [];

    for (let movie of lastSearchResults) {
        const url = `${OMDB_API_URL}?i=${movie.imdbID}&apikey=${OMDB_API_KEY}`;
        const res = await fetch (url);
        const fullMovie = await res.json();
        detailedMovies.push(fullMovie);
    }

    const comedyMovies = detailedMovies.filter(movie => movie.Genre && movie.Genre.includes("Comedy")
    );

    showLoading(false);

    if (comedyMovies.length === 0) {
        showError("No comedy movies found for your search.");
        return;
    }

    displayMovies(comedyMovies);
}



// BURGER MENU 

document.addEventListener("DOMContentLoaded", () => {

    const burgerOpen = document.querySelector(".burger-open");
    const burgerClose = document.querySelector(".burger-close");
    const burgerMenu = document.querySelector(".burger-menu__dropdown");
    const homeBtn = document.getElementById("home__btn");
    const mobileRandom = document.getElementById("mobile-random");

 function closeBurgerMenu() {
        burgerMenu.style.display = "none";
        burgerOpen.style.display = "block";
        burgerClose.style.display = "none";
    }

    burgerOpen.addEventListener("click", () => {
        burgerMenu.style.display = "flex";
        burgerOpen.style.display = "none";
        burgerClose.style.display = "flex";
    });

    burgerClose.addEventListener("click", closeBurgerMenu);

    homeBtn.addEventListener("click", (e) => {
        e.preventDefault(); // prevent "#" reload
        closeBurgerMenu();
        window.location.href = "index.html";
    });

    mobileRandom.addEventListener("click", (e) => {
        e.preventDefault();  
        generateRandomMovie();  
        closeBurgerMenu();  
    });

});
