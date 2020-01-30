const eventHub = document.getElementById("eventHub")

export const playerListener = () => eventHub.addEventListener("addPlayerButtonClicked", (evt) => {
    addPlayer(evt.detail.newPlayer)
} )

let players = []

export const usePlayers = () => {
    return players.slice()
}

export const getPlayers = () => {
    return fetch("http://localhost:3003/players?_expand=team")
    .then((res) => res.json())
    .then((res) => players = res)
}

const addPlayer = (newPlayer) => {
    return fetch("http://localhost:3003/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlayer)
        })
        .then(() => getPlayers())
}


