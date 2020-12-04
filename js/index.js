"use strict";

function getMovies(search) {
  const URL = `http://www.omdbapi.com/?apikey=${apiKey}` + "&" + "s=" + search;
  axios
    .get(URL)
    .then((response) => {
      if (response) {
        console.log(response);
        // get list of movies
        let movies = response.data.Search;
        let outputHTML = "";
        $.each(movies, (index, movie) => {
          outputHTML += `
            <div class='col-md-3'>
                <div class='well text-center'>
                    <img src='${movie.Poster}' />
                    <h5>${movie.Title}</h5>
                    <input onclick="movieSelected('${movie.imdbID}')" class='btn btn-primary' type='text' value='Movie Details'/>
                </div>
            </div>
            `;
        });

        $("#movies").html(outputHTML);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function movieSelected(id) {
  let session = sessionStorage.setItem("movieId", id);
  console.log(session);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  const URL = `http://www.omdbapi.com/?apikey=${apiKey}` + "&" + "i=" + movieId;

  axios.get(URL).then((response) => {
    if (response) {
      console.log(response);
    }
  });
}

function watchForm() {
  $("form").submit((e) => {
    e.preventDefault();
    let search = $("#searchText").val();
    getMovies(search);
    getMovie();
  });
}

function main() {
  watchForm();
}

$(main());
