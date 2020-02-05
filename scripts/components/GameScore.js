import { useTeams } from "../providers/TeamProvider.js"

const eventHub = document.getElementById("eventHub")
const container = document.getElementById("scoreKeeper")

//returns the current app state of teams
const currentTeams = () => {
    return useTeams()
}

const gameOverListener = () => {
    eventHub.addEventListener("gameOver", (evt) => {

    })
}


const roundPhase = () => {
    eventHub.addEventListener("roundPhase", (evt) => {
        if (localStorage.getItem("gamePlay") !== null && localStorage.getItem("gamePlay").round <= 3){

        }
        else{
            scoreKeeper.ScoreComponent()
        }

    })
}

//returns HTML for current score component
const initialHTML = () => `
<div class="currentScore">
    Current Score
</div>`

const playHTML = () => `
<div class="currentScore">
    Current Score
</div>`


export const scoreKeeper = {


    ScoreComponent : () => {
        container.innerHTML = initialHTML()
    },

    applyScoreKeeperListeners : () => {
       gameOverListener()
       roundPhase()

    }


}
