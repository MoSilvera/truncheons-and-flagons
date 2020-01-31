const eventHub = document.getElementById("eventHub")

let teamScores = []

export const useTeamScores = () => {
    return teamScores.slice()
}

export const teamScoreListener = () => {
    eventHub.addEventListener("gameOver", (evt) => {

       let teamOneScore = evt.detail.teamOneScore
       let teamTwoScore = evt.detail.teamTwoScore
       let teamThreeScore = evt.detail.teamThreeScore

       let scoreArray = [teamOneScore, teamTwoScore, teamThreeScore]
       let maxArray = scoreArray.sort((a, b) => b.teamScore - a.teamScore)

       const gameObj = {}
       addTeamScore(teamOneScore)
       .then(res => gameObj.teamOneScoreId = res.id)
       .then(() => addTeamScore(teamTwoScore))
       .then((res) => gameObj.teamTwoScoreId = res.id)
       .then(() => addTeamScore(teamThreeScore))
       .then((res) => gameObj.teamThreeScoreId = res.id)
       .then(() => {
           let message = new CustomEvent("teamScoresSaved", {
               detail:{
                   gameObj: gameObj,
                   winner: maxArray[0]
               }
           })
           eventHub.dispatchEvent(message)
       })
       .then(() => getTeamScores())
    })
}

export const getTeamScores = () => {
    return fetch("http://localhost:3003/teamScores?_expand=team")
    .then((res) => res.json())
    .then((res) => teamScores = res)
}

const addTeamScore = (newTeamScore) => {
    return fetch("http://localhost:3003/teamScores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTeamScore)
        })
        .then((res) => res.json())
}


