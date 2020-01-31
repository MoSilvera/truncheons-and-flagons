const eventHub = document.getElementById("eventHub")

let games = []

export const useGames = () => {
    return teams.slice()
}

export const gameListener = () => {
    eventHub.addEventListener("teamScoresSaved", (evt) => {
        let gameObj = evt.detail.gameObj
        gameObj.timestamp = Date.now()
        addGame(gameObj)
        .then(() => {
            const message = new CustomEvent("gameSaved", {
                detail:{
                    winner: evt.detail.winner
                }
            })
            eventHub.dispatchEvent(message)
        })
    })
}

export const getGames = () => {
    return fetch("http://localhost:3003/games")
    .then((res) => res.json())
    .then((res) => games = res)
}

const addGame = (newGame) => {
    return fetch("http://localhost:3003/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
        .then(() => getGames())
}


