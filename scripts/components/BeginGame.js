import { useTeams } from "../providers/TeamProvider.js"

const eventHub = document.getElementById("eventHub")
const container = document.getElementById("dynamicComponentContainer")

//returns the current app state of teams
const currentTeams = () => {
    return useTeams()
}

//listener for begin game button, makes a gamePlay object and put it in local storage, dispatches game started event
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

//gameSaved listener, after game is completed and scores are saved, the final game object is saved
//Triggers alert with winner, clears local storage, and re-renders begin game component
const gameSavedListener = () => {
    eventHub.addEventListener("gameSaved", (evt) => {
        const teams = currentTeams()
        const winner = teams.find(team => team.id === evt.detail.winner.teamId)
        alert(`I doth say, ${winner.name} has won!`)
        localStorage.clear()
        container.innerHTML= HTML()

    })
}

//returns HTML for begin game component
const HTML = () => `
<div class="beginGameComponent">
    <button id="beginGameBtn">New Game</button>
</div>`

//checks for existing game, if there is an existing game
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

//object that has methods for rendering the component and adding the listeners
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
