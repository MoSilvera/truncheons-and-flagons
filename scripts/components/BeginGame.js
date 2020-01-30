const eventHub = document.getElementById("eventHub")
const container = document.getElementById("dynamicComponentContainer")

const beginGameListener = () => {
    eventHub.addEventListener("click", (evt) => {
        if(evt.target.id === "beginGameBtn"){
            localStorage.setItem("gamePlay", JSON.stringify(
                {
                    gameId: 0,
                    teamOne: [],
                    teamTwo: [],
                    teamThree: [],
                    round: 0
                }
            ))
            const message = new CustomEvent("gameStarted")
            eventHub.dispatchEvent(message)
        }
    })
}

const HTML = () => `
<div class="beginGameComponent">
    <button id="beginGameBtn">New Game</button>
</div>`

const checkForExistingGame = () => {
    if (localStorage.getItem("gamePlay") !== null){
        const message = new CustomEvent("roundInProgress")
        eventHub.dispatchEvent(message)
    }
}


export const BeginGame = {


    BeginGameComponent : () => {
        container.innerHTML = HTML()
        checkForExistingGame()
    },

    applyBeginGameListeners : () => {
        beginGameListener()

    }


}
