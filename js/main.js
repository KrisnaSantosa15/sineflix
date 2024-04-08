window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  // const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > fixedNav) {
    // header.classList.add("navbar-fixed");
    header.style.position = "fixed";
  } else {
    // header.classList.remove("navbar-fixed");
    header.style.position = "relative";
  }
};

let swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// OWL Carousel
$(document).ready(function () {
  // New releases
  $.getJSON(
    "https://krisnasantosa15.github.io/sineflix/js/data/data.json",
    function (data) {
      let content = "";
      $.each(data.items, function (index, item) {
        if (item.type == "Movie" && item.year > 2020) {
          content += `
            <a href="https://krisnasantosa15.github.io/sineflix/pages/detailFilm.html?id=${
              item.id
            }">
            <div class="cards">
              <div class="card-img">
                <img class="lazyOwl" src="${item.img}" alt="${item.title}">
                <div class="img-title">
                  <h4>${item.rating}</h4>
                  <p>IMDb</p>
                </div>
              </div>
              <div class="card-title">
                <h3>${item.title}</h3>
                <p>${item.genre.join(", ")}</p>
                </div>
            </div>
            </a>
            `;
        }
      });

      $("#owl-new-releases").html(content);

      $("#owl-new-releases").owlCarousel({
        loop: true,
        lazyLoad: true,
        margin: 0,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          500: {
            items: 2,
          },
          768: {
            items: 3,
          },
          1000: {
            items: 4,
          },
          1200: {
            items: 5,
          },
        },
      });
    }
  );

  // Animated
  $.getJSON(
    "https://krisnasantosa15.github.io/sineflix/js/data/data.json",
    function (data) {
      let content = "";
      $.each(data.items, function (index, item) {
        if (item.type == "Animation") {
          content += `
        <a href="https://krisnasantosa15.github.io/sineflix/pages/detailFilm.html?id=${
          item.id
        }">
        <div class="cards">
          <div class="card-img">
            <img class="lazyOwl" src="${item.img}" alt="${item.title}">
            <div class="img-title">
              <h4>${item.rating}</h4>
              <p>IMDb</p>
            </div>
          </div>
          <div class="card-title">
            <h3>${item.title}</h3>
            <p>${item.genre.join(", ")}</p>
          </div>
        </div>
        </a>
      `;
        }
      });
      $("#owl-animated-movies").html(content);

      $("#owl-animated-movies").owlCarousel({
        loop: true,
        lazyLoad: true,
        margin: 0,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          500: {
            items: 2,
          },
          768: {
            items: 3,
          },
          1000: {
            items: 4,
          },
          1200: {
            items: 5,
          },
        },
      });
    }
  );

  //   TV Series
  $.getJSON(
    "https://krisnasantosa15.github.io/sineflix/js/data/data.json",
    function (data) {
      let content = "";
      $.each(data.items, function (index, item) {
        if (item.type == "TV") {
          content += `
        <a href="https://krisnasantosa15.github.io/sineflix/pages/detailFilm.html?id=${
          item.id
        }">
        <div class="cards">
          <div class="card-img">
            <img class="lazyOwl" src="${item.img}" alt="${item.title}">
            <div class="img-title">
              <h4>${item.rating}</h4>
              <p>IMDb</p>
            </div>
          </div>
          <div class="card-title">
            <h3>${item.title}</h3>
            <p>${item.genre.join(", ")}</p>
          </div>
        </div>
        </a>
      `;
        }
      });
      $("#owl-tv-series").html(content);

      $("#owl-tv-series").owlCarousel({
        loop: true,
        lazyLoad: true,
        margin: 0,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          500: {
            items: 2,
          },
          768: {
            items: 3,
          },
          1000: {
            items: 4,
          },
          1200: {
            items: 5,
          },
        },
      });
    }
  );
});

const nav = document.querySelector(".nav-items");
const open = document.getElementById("open");
const close = document.getElementById("close");

open.addEventListener("click", () => {
  nav.style.display = "flex";
  nav.style.top = "0%";
});
close.addEventListener("click", () => {
  nav.style.top = "-110vh";
});

function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}

async function getSearchSuggestions(keyword) {
  const response = await fetch(
    "https://krisnasantosa15.github.io/sineflix/js/data/data.json"
  );
  const data = await response.json();
  const movies = data.items;

  const searchSuggestions = document.getElementById("searchSuggestions");
  searchSuggestions.innerHTML = "";

  if (keyword.trim() !== "") {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(keyword.toLowerCase())
    );
    filteredMovies.forEach((movie) => {
      const link = document.createElement("a");
      link.textContent = `${movie.title} - ${movie.type}`;
      link.href = `/pages/detailFilm.html?id=${movie.id}`;

      const suggestionElement = document.createElement("div");
      suggestionElement.addEventListener("click", () => {
        document.querySelector("input[name='search']").value = movie.title;
        searchSuggestions.innerHTML = "";
      });
      suggestionElement.appendChild(link);
      searchSuggestions.appendChild(suggestionElement);
    });
  }
}

// All movies:
document.addEventListener("DOMContentLoaded", function () {
  let selectedGenres = [];

  fetchMovies();

  function fetchMovies() {
    fetch("https://krisnasantosa15.github.io/sineflix/js/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        generateGenreButtons();

        generateMovieCards(data.items);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }

  function generateGenreButtons() {
    const genres = [
      "Action",
      "Adventure",
      "Biography",
      "Crime",
      "Comedy",
      "Drama",
      "Fantasy",
      "Historical",
      "Horror",
      "Musical",
      "Sci-Fi",
      "Sport",
      "Thriller",
    ];

    const genreButtonsContainer = document.getElementById("genreButtons");

    genres.forEach((genre) => {
      const button = document.createElement("button");
      button.textContent = genre;
      button.classList.add("btn");
      button.classList.add("genre-button");
      button.addEventListener("click", () => toggleGenreFilter(genre, button));
      genreButtonsContainer.appendChild(button);
    });
  }

  function toggleGenreFilter(genre, button) {
    const index = selectedGenres.indexOf(genre);
    if (index === -1) {
      selectedGenres.push(genre);
      button.classList.add("active");
    } else {
      selectedGenres.splice(index, 1);
      button.classList.remove("active");
    }
    filterMovies();
  }

  function filterMovies() {
    fetch("https://krisnasantosa15.github.io/sineflix/js/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        let filteredMovies = data.items;
        if (selectedGenres.length > 0) {
          filteredMovies = filteredMovies.filter((movie) => {
            return selectedGenres.every((genre) => movie.genre.includes(genre));
          });
        }
        generateMovieCards(filteredMovies);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }

  function generateMovieCards(movies) {
    const movieContainer = document.getElementById("movieContainer");

    movieContainer.innerHTML = "";

    if (movies.length === 0) {
      let content = `
        <div class="no-movies">
            <h2>No movies found.</h2>
        </div>
      `;
      movieContainer.innerHTML = content;
    } else {
      movies.slice(0, 15).forEach((movie) => {
        const card = `
          <a href="https://krisnasantosa15.github.io/sineflix/pages/detailFilm.html?id=${
            movie.id
          }">
          <div class="cards">
              <div class="card-img">
                  <img src="${movie.img}" alt="${movie.title}">
                  <div class="img-title">
                      <h4>${movie.rating}</h4>
                      <p>IMDb</p>
                  </div>
              </div>
              <div class="card-title">
                  <h3>${movie.title}</h3>
                  <p>${movie.genre.join(", ")}</p>
              </div>
          </div>
          </a>
        `;
        movieContainer.insertAdjacentHTML("beforeend", card);
      });
    }
  }
});
