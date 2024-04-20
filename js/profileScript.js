const logoutButton = document.querySelector("#menu4");
logoutButton.addEventListener("click", function() {

    const isLogout = confirm("Anda yakin ingin keluar?");

    if (isLogout) {
        location.href = "/index.html";
    } else {
        location.href = "/pages/profile.html";
    }
});

const buttons = [
    document.getElementById('menu1'),
    document.getElementById('menu2'),
    document.getElementById('menu3')
];

const contents = [
    document.getElementById('submenu'),
    document.getElementById('page2'),
    document.getElementById('page3')
];

const subButtons = [
    document.getElementById('submenu1'),
    document.getElementById('submenu2'),
    document.getElementById('submenu3')
];
const subContents = [
    document.getElementById('subContent1'),
    document.getElementById('subContent2'),
    document.getElementById('subContent3')
];

buttons.forEach((button, index) => {
    button.addEventListener('click', function () {
        for (let i = 0; i < buttons.length; i++) {
            if (i === index && i === 0){
                buttons[i].classList.add('active-menu');
                contents[i].classList.add('active-submenu-list');
                subButtons[0].classList.add('active-submenu');
                subContents[0].classList.add('active-subContent');
            }
            else if (i === index && i >=1) {
                buttons[i].classList.add('active-menu');
                contents[i].classList.add('active-content');
                subButtons[i].classList.remove('active-submenu');
                subContents[i].classList.remove('active-subContent');
            }
            else {
                buttons[i].classList.remove('active-menu');
                contents[i].classList.remove('active-content');
                contents[i].classList.remove('active-submenu-list');
                subButtons[i].classList.remove('active-submenu');
                subContents[i].classList.remove('active-subContent');
            }

        }
    })
});


subButtons.forEach((button, index) => {
    button.addEventListener('click', function () {

        for (let i = 0; i < subButtons.length; i++) {
            if (i === index) {

                subButtons[i].classList.add('active-submenu');
                subContents[i].classList.add('active-subContent');
            } else {
                subButtons[i].classList.remove('active-submenu');
                subContents[i].classList.remove('active-subContent');
            }
        }
    });
});

const editButton = document.getElementById('edit-button');
const editedContent = document.getElementById('edited');
const editingContent = document.getElementById('editing');

editButton.addEventListener('click', function () {
    editedContent.classList.remove('active-edit-profile');
    editingContent.classList.add('active-edit-profile');
})

const exitButton = document.getElementById('exit-button');

exitButton.addEventListener('click', function () {
    editedContent.classList.add('active-edit-profile');
    editingContent.classList.remove('active-edit-profile');
})


const acceptButton = document.getElementById('accept-button');

acceptButton.addEventListener('click', function () {
    editedContent.classList.add('active-edit-profile');
    editingContent.classList.remove('active-edit-profile');
})

document.addEventListener("DOMContentLoaded", function() {
    const movieContainer = document.getElementById("movieContainer");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const movies = [
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie1.jpg" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie2.jpg" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie3.jpg" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie4.jpeg" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie5.png" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie6.png" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie7.png" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie8.png" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie9.png" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie10.png" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie11.png" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie12.png" },
        { title: "Movie", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie13.png" },
        { title: "Movie 1", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie14.png" },
        { title: "Movie 1", releaseDate: "2023", imageSrc: "/img/MoviesOnProfile/movie15.png" },
    ];
    const moviesPerPage = 10;
    let currentPage = 0;

    function createMovieElement(movie) {
        const li = document.createElement("li");
        li.classList.add("movie");

        const img = document.createElement("img");
        img.src = movie.imageSrc;
        img.alt = movie.title;

        const title = document.createElement("div");
        title.classList.add("movie-title");
        title.textContent = movie.title;

        const releaseDate = document.createElement("div");
        releaseDate.classList.add("movie-release-date");
        releaseDate.textContent = movie.releaseDate;

        li.appendChild(img);
        li.appendChild(title);
        li.appendChild(releaseDate);
        return li;
    }

    function displayMovies() {
        const start = currentPage * moviesPerPage;
        const end = start + moviesPerPage;

        movieContainer.innerHTML = "";

        for (let i = start; i < end && i < movies.length; i++) {
            const movie = movies[i];
            const movieElement = createMovieElement(movie);
            movieContainer.appendChild(movieElement);
        }

        prevButton.disabled = currentPage === 0;
        nextButton.disabled = end >= movies.length;
    }

    displayMovies();

    nextButton.addEventListener("click", function() {
        currentPage++;
        displayMovies();
    });

    prevButton.addEventListener("click", function() {
        currentPage--;
        displayMovies();
    });
});
