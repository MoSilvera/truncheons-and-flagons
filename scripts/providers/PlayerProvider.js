const eventHub = document.getElementById("eventHub")

export const newListener = () => eventHub.addEventListener("addPlayerButtonClicked", (evt) => {
    console.log(evt.detail.newPlayer)
} )