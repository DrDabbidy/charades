// vars and consts
const strftime = (intTime) => {
    minutes = Math.floor(intTime / 60);
    seconds = intTime % 60;
    return `${minutes}:${seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;
};
const prompt = document.querySelector("#prompt");
let teamOneTime = 0;
let teamTwoTime = 0;
let teamOneTimeComponent = document.querySelector("#time-1")
let teamTwoTimeComponent = document.querySelector("#time-2")
let team = true;

// logic
const changeTeam = () => {
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
let t = setInterval(incrementTimer, 1000);
changeTeam();

// add event listeners
document.querySelector("#button").addEventListener("click", () => {
    team = !team;
    changeTeam();
    clearInterval(t);
    t = setInterval(incrementTimer, 1000);
});
