const OMDB_API_KEY = "fde8a112";
const OMDB_API_URL = "https://www.omdbapi.com/";

const container = document.getElementById("movie-details");


async function loadMovie() {
    const id = localStorage.getItem("selectedMovieID");

    if (!id) {
        container.innerHTML = "<p>No movie selected.</p>";
        return;
    }

    const url = `${OMDB_API_URL}?i=${id}&plot=full&apikey=${OMDB_API_KEY}`;
    const response = await fetch(url);
    const movie = await response.json();

    container.innerHTML = `
        <div class="row movie-details">
            <div class="movie-details-wrapper">

                <figure class="movie-details-poster__wrapper">
                    <img class="movie-details-poster" src="${movie.Poster}">
                </figure>

                <div class="movie-info">
                    <h1>${movie.Title} (${movie.Year})</h1>
                    <p><strong>Genre:</strong> ${movie.Genre}</p>
                    <p><strong>Director:</strong> ${movie.Director}</p>
                    <p><strong>Actors:</strong> ${movie.Actors}</p>
                    <p><strong>Plot:</strong> ${movie.Plot}</p>
                </div>
            </div>

            <button id="back__btn" class="back-btn">Back</button>
        </div>
    `;

    document.getElementById("back__btn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

loadMovie();
