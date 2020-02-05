import { useTeams } from "../providers/TeamProvider.js"

const eventHub = document.getElementById("eventHub")
const container = document.getElementById("leaderBoard")

//returns the current app state of teams
const currentTeams = () => {
    return useTeams()
}

const gameSavedListener = () => {
    eventHub.addEventListener("gameSaved", (evt) => {

    })
}

const HTML = () => `
<div class="currentLeaders">
    Current Leaders
</div>`


export const leaderBoard = {


    LeaderBoardComponent : () => {
        container.innerHTML = HTML()
    },

    applyLeaderBoardListeners : () => {
      gameSavedListener

    }


}
