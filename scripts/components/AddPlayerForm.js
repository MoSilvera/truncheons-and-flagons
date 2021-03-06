import { useTeams } from "../providers/TeamProvider.js"

const eventHub = document.getElementById("eventHub")
const container = document.getElementById("playerFormContainer")

//returns the current App state of teams
const CurrentTeamsState = () => {
    let apiState = useTeams()
    return apiState
}

//listener for the add player button, sends out custom message with player object
const addPlayerListener = () => {
    eventHub.addEventListener("click", (evt) => {
        if(evt.target.id === "addPlayerBtn"){

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

//returns html for team form
const HTML = (teams) => `
<div class="addPlayerComponent">
    <div className="form-group">
        <label htmlFor="playerName">PlayerName</label>
        <input type="text" id="playerName" className="form-control"placeholder="Player Name"/>
    </div>
    <div className="form-group">
        <label htmlFor="team">Assign to team</label>
        <select name="team" id="playerTeam" className="form-control">
            <option value="0">Select a Team</option>
            ${teams.map(team => `<option value=${team.id}>${team.name}</option>`).join(" ")}
        </select>
    </div>
    <button id="addPlayerBtn">Add Player</button>
</div>`


//object with methods that render the component and apply the listeners
export const AddPlayerForm = {


    AddPlayerFormComponent : () => {
        const teams = CurrentTeamsState()
        container.innerHTML = HTML(teams)
    },

    applyPlayerFormListeners : () => {
        addPlayerListener()
    }


}
