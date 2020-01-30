//local storage should contain these properties
//teamId: score. Three- one for each team
//gameId: id
//round: int. 0-3


const eventHub = document.getElementById("eventHub")
const container = document.getElementById("dynamicComponentContainer")

const roundInProgressListener = () => {
    eventHub.addEventListener("roundInProgress", (evt) => {
        let round = JSON.parse(localStorage.getItem("gamePlay")).round
       PointForm.PointFormComponent(round)

    })
}
const teamsSelectedListener = () => {
    eventHub.addEventListener("teamsSelected", () => {
        PointForm.PointFormComponent()
        console.log(JSON.parse(localStorage.getItem("gamePlay")))
})
}

const HTML = (number) => `
<div class="addPointForm">
   <h4>Round ${number}</h4>
</div>`



export const PointForm = {


    PointFormComponent : (round) => {
        container.innerHTML = HTML(round)
    },

    applyPointFormListeners : () => {
        roundInProgressListener()
        teamsSelectedListener()
    }


}
