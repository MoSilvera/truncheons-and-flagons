const eventHub = document.getElementById("eventHub")

let teams = []

export const useTeams = () => {
    return teams.slice()
}

export const teamListener = () => {
    eventHub.addEventListener("addTeamButtonClicked", (evt) => {
        const message = new CustomEvent("teamStateChanged")
        addTeam(evt.detail.newTeam)
        .then(() => eventHub.dispatchEvent(message))
    })
}

export const getTeams = () => {
    return fetch("http://localhost:3003/teams")
    .then((res) => res.json())
    .then((res) => teams = res)
}

const addTeam = (newTeam) => {
    return fetch("http://localhost:3003/teams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTeam)
        })
        .then(() => getTeams())
}


