const eventHub = document.getElementById("eventHub")
const container = document.getElementById("dynamicComponentContainer")


const beginGameListener = () => {
    eventHub.addEventListener("click", (evt) => {
        if(evt.target.id === "beginGameBtn"){
            localStorage.setItem("gamePlay", JSON.stringify(
                {
                    team_1: [],
                    team_2: [],
                    team_3: [],
                    round: 0
                }
            ))
            const message = new CustomEvent("gameStarted")
            eventHub.dispatchEvent(message)
        }
    })
}

const gameSavedListener = () => {
    eventHub.addEventListener("gameSaved", () => {
        console.log("game Saved")
    })
}

const HTML = () => `
<div class="beginGameComponent">
    <button id="beginGameBtn">New Game</button>
</div>`

const checkForExistingGame = () => {
    if (localStorage.getItem("gamePlay") !== null && localStorage.getItem("gamePlay").round <= 3){
        const message = new CustomEvent("roundPhase")
        eventHub.dispatchEvent(message)
    }
    else{
        localStorage.clear()
        container.innerHTML = HTML()
    }
}


export const BeginGame = {


    BeginGameComponent : () => {
        container.innerHTML = HTML()
        checkForExistingGame()
    },

    applyBeginGameListeners : () => {
        beginGameListener()
        gameSavedListener()

    }


}
