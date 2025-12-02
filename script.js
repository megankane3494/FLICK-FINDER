const OMNI_API_KEY = 'fde8a112';
const OMNI_API_URL = 'https://www.omdbapi.com/';

const searchInput = document.querySelector(".search__input");
const magnifyGlassBtn = document.querySelector(".fa-magnifying-glass");
const loadingMessage = document.querySelector(".loading");
const errorMessage = document.querySelector(".error");
const resultsContainer = document.querySelector(".results-container")

magnifyGlassBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        searchMovies();
    }
});

function searchMovies () {

}


async function fetchMovies () {
    const url = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=fde8a112');
    const urlData = await url.json();
    console.log(urlData)

}