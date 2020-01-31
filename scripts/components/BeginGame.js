import { useTeams } from "../providers/TeamProvider.js"

const eventHub = document.getElementById("eventHub")
const container = document.getElementById("dynamicComponentContainer")

const currentTeams = () => {
    return useTeams()
}


const beginGameListener = () => {
    eventHub.addEventListener("click", (evt) => {
        if(evt.target.id === "beginGameBtn"){
            localStorage.setItem("gamePlay", JSON.stringify(
                {
                    team_1: [],
                    team_2: [],
                    team_3: [],
                    round: 0
                }
            ))
            const message = new CustomEvent("gameStarted")
            eventHub.dispatchEvent(message)
        }
    })
}

const gameSavedListener = () => {
    eventHub.addEventListener("gameSaved", (evt) => {
        const teams = currentTeams()
        const winner = teams.find(team => team.id === evt.detail.winner.teamId)
        alert(`I doth say, ${winner.name} has won!`)
        localStorage.clear()
        container.innerHTML= HTML()

    })
}

const HTML = () => `
<div class="beginGameComponent">
    <button id="beginGameBtn">New Game</button>
</div>`

const checkForExistingGame = () => {
    if (localStorage.getItem("gamePlay") !== null && localStorage.getItem("gamePlay").round <= 3){
        const message = new CustomEvent("roundPhase")
        eventHub.dispatchEvent(message)
    }
    else{
        localStorage.clear()
        container.innerHTML = HTML()
    }
}


export const BeginGame = {


    BeginGameComponent : () => {
        container.innerHTML = HTML()
        checkForExistingGame()
    },

    applyBeginGameListeners : () => {
        beginGameListener()
        gameSavedListener()

    }


}
