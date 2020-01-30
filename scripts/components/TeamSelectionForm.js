import { useTeams } from "../providers/TeamProvider.js"

const eventHub = document.getElementById("eventHub")
const container = document.getElementById("dynamicComponentContainer")

const CurrentTeamsState = () => {
    let apiState = useTeams()
    return apiState
}

const gameBeginListener = () => {
    eventHub.addEventListener("gameStarted", () => {
        TeamSelectionForm.TeamSelectionComponent()
    })
}

const addTeamsToGameListener = () => {
    eventHub.addEventListener("click", (evt) => {
        if(evt.target.id === "addTeamsToGameBtn"){

            const name = document.getElementById("playerName").value
            const teamId = parseInt(document.getElementById("playerTeam").value)
            const newPlayer = {
                name: name,
                teamId: teamId
            }
            const message = new CustomEvent("addPlayerButtonClicked", {
                detail: {
                    newPlayer: newPlayer
                }
            })
            eventHub.dispatchEvent(message)
        }
    })
}

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
