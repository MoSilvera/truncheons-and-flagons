
const eventHub = document.getElementById("eventHub")
const container = document.getElementById("playerFormContainer")

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

const HTML = () => `
<div class="addPlayerComponent">
    <div className="form-group">
        <label htmlFor="animalBreed">PlayerName</label>
        <input type="text" id="playerName" className="form-control"placeholder="Player Name"/>
    </div>
    <div className="form-group">
        <label htmlFor="team">Assign to team</label>
        <select name="team" id="playerTeam" className="form-control">
            <option value="0">Select a Team</option>
        </select>
    </div>
    <button id="addPlayerBtn">Add Player</button>
</div>`



export const AddPlayerForm = {


    AddPlayerFormComponent : () => {
        container.innerHTML = HTML()
    },

    applyPlayerFormListeners : () => {
        addPlayerListener()
    }


}
