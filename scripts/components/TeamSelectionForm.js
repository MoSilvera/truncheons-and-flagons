import { useTeams } from "../providers/TeamProvider.js"

const eventHub = document.getElementById("eventHub")
const container = document.getElementById("dynamicComponentContainer")

//returns the current app state of teams
const CurrentTeamsState = () => {
    let apiState = useTeams()
    return apiState
}

//listens for the game begin event and renders the team selection component
const gameBeginListener = () => {
    eventHub.addEventListener("gameStarted", () => {
        TeamSelectionForm.TeamSelectionComponent()
    })
}

//adds listener for add teams to game btn, when clicked adds team ids to local storage and dispatches
const addTeamsToGameListener = () => {
    eventHub.addEventListener("click", (evt) => {
        if(evt.target.id === "addTeamsToGameBtn"){

          const localStorageGamePlay =  JSON.parse(localStorage.getItem('gamePlay'))
            localStorageGamePlay.team_1[0] = parseInt(document.getElementById("teamOne").value)
            localStorageGamePlay.team_2[0] = parseInt(document.getElementById("teamTwo").value)
            localStorageGamePlay.team_3[0] = parseInt(document.getElementById("teamThree").value)
            localStorageGamePlay.team_1[1] = 0
            localStorageGamePlay.team_2[1] = 0
            localStorageGamePlay.team_3[1] = 0
            let round = localStorageGamePlay.round
            localStorageGamePlay.round = round + 1
            localStorage.setItem("gamePlay", JSON.stringify(localStorageGamePlay))
            const message = new CustomEvent("roundPhase")
            eventHub.dispatchEvent(message)
        }
    })
}

//returns HTML for the team selection component
const HTML = (teams) => `
<div class="addTeamsToGameComponent">
    <div className="form-group">
        <label htmlFor="team">Pick Three Teams</label>
        <select name="team" id="teamOne" className="form-control">
            <option value="0">Select a Team</option>
            ${teams.map(team => `<option value=${team.id}>${team.name}</option>`).join(" ")}
        </select>
        <select name="team" id="teamTwo" className="form-control">
            <option value="0">Select a Team</option>
            ${teams.map(team => `<option value=${team.id}>${team.name}</option>`).join(" ")}
        </select>
        <select name="team" id="teamThree" className="form-control">
            <option value="0">Select a Team</option>
            ${teams.map(team => `<option value=${team.id}>${team.name}</option>`).join(" ")}
        </select>
    </div>
    <button id="addTeamsToGameBtn">Add Player</button>
</div>`


//object with method that renders the component and applies begin game/ add team listener
export const TeamSelectionForm = {


    TeamSelectionComponent : () => {
        const teams = CurrentTeamsState()
        container.innerHTML = HTML(teams)
    },

    applyTeamSelectionListeners : () => {
        addTeamsToGameListener()
        gameBeginListener()
    }


}
