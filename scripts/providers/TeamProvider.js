const eventHub = document.getElementById("eventHub")

export const teamListener = () => {
    eventHub.addEventListener("addTeamButtonClicked", (evt) => {
        console.log(evt.detail.newTeam)
    })
}