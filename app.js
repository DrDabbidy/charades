// vars and consts
const prompt = document.querySelector("#prompt");
const button = document.querySelector("#button");
let currentPageOffset = 0;
let movies = [];
let teamOneTime = 0;
let teamTwoTime = 0;
let teamOneTimeComponent = document.querySelector("#time-1")
let teamTwoTimeComponent = document.querySelector("#time-2")
let team = true;

// functions
const strftime = (intTime) => {
    minutes = Math.floor(intTime / 60);
    seconds = intTime % 60;
    return `${minutes}:${seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;
};
const makeTimerActive = () => {
    if (team) {
        teamOneTimeComponent.style.color = "#FF7F51";
        teamTwoTimeComponent.style.color = "white";
    } else {
        teamOneTimeComponent.style.color = "white";
        teamTwoTimeComponent.style.color = "#FF7F51";
    }
};
const incrementTimer = () => {
    if (team) {
        teamOneTime += 1;
        teamOneTimeComponent.textContent = strftime(teamOneTime);
    } else {
        teamTwoTime += 1;
        teamTwoTimeComponent.textContent = strftime(teamTwoTime);
    }
};
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};
const refreshMovies = async () => {
    for (let i = 0; i < 10; i++) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=a1293d9012e07d11d8d72aff13fb5ccc&page=${i + currentPageOffset + 1}`);
        const moviesJSON = await response.json();
        moviesJSON["results"].filter((movie) => {
            return (movie["original_language"] === "en");
        }).map((movie) => {
            return movie["title"];
        }).forEach((movie) => {
            movies.push(movie)
        });
    }
    currentPageOffset += 10;
    shuffleArray(movies);
};
const getMovie = async () => {
    if (movies.length !== 0) {
        return movies.pop();
    } else {
        await refreshMovies();
        return getMovie();
    }
};

// add event listeners
button.addEventListener("click", async () => {
    switch(action) {
        case "show prompt":
            prompt.textContent = await getMovie();
            action = "start round";
            break;
        case "start round":
            makeTimerActive();
            t = setInterval(incrementTimer, 1000);
            action = "end round";
            break;
        case "end round":
            team = !team;
            clearInterval(t);
            action = "show prompt";
            break;
    }
    button.textContent = action;
});

action = "show prompt";
