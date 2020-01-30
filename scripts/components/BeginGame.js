const eventHub = document.getElementById("eventHub")
const container = document.getElementById("dynamicComponentContainer")

const beginGameListener = () => {
    eventHub.addEventListener("click", (evt) => {
        if(evt.target.id === "beginGameBtn"){
            localStorage.clear()
            console.log('begin game button clicked')
            const message = new CustomEvent("addTeamButtonClicked")
            eventHub.dispatchEvent(message)
        }
    })
}

const HTML = () => `
<div class="beginGameComponent">
    <button id="beginGameBtn">New Game</button>
</div>`



export const BeginGame = {


    BeginGameComponent : () => {
        container.innerHTML = HTML()
    },

    applyBeginGameListeners : () => {
        beginGameListener()
    }


}
