//local storage should contain these properties
//teamId: score. Three- one for each team
//gameId: id
//round: int. 0-3


const eventHub = document.getElementById("eventHub")
const container = document.getElementById("dynamicComponentContainer")

const pointFormListener = () => {
    eventHub.addEventListener("roundInProgress", (evt) => {
        console.log("round")
       PointForm.PointFormComponent()

    })
}

const HTML = () => `
<div class="addPointForm">
   <h4>Points Yo</h4>
</div>`



export const PointForm = {


    PointFormComponent : () => {
        container.innerHTML = HTML()
    },

    applyPointFormListeners : () => {
        pointFormListener()
    }


}
