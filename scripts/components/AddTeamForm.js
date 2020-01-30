const eventHub = document.getElementById("eventHub")
const container = document.getElementById("teamFormContainer")

const addTeamListener = () => {
    eventHub.addEventListener("click", (evt) => {
        if(evt.target.id === "addTeamBtn"){

            const name = document.getElementById("teamName").value
            const newTeam = {
                name: name
            }
            const message = new CustomEvent("addTeamButtonClicked", {
                detail: {
                    newTeam: newTeam
                }
            })
            eventHub.dispatchEvent(message)
            document.getElementById("teamName").value = ""
        }
    })
}

const HTML = () => `
<div class="addTeamComponent">
    <div className="form-group">
        <label htmlFor="teamName">Team Name</label>
        <input type="text" id="teamName" className="form-control" placeholder="Team Name"/>
    </div>
    <button id="addTeamBtn">Add Team</button>
</div>`



export const AddTeamForm = {


    AddTeamFormComponent : () => {
        container.innerHTML = HTML()
    },

    applyTeamFormListeners : () => {
        addTeamListener()
    }


}
