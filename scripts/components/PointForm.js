import { useTeams } from "../providers/TeamProvider.js"

const eventHub = document.getElementById("eventHub")
const container = document.getElementById("dynamicComponentContainer")

//returns current state of the app whenever called
const currentTeamsState = () => {
    let apiState = useTeams()
    return apiState
}


//listens for round in progress event, triggering render of the Point Round component
const roundPhaseListener = () => {
    eventHub.addEventListener("roundPhase", (evt) => {
        let round = JSON.parse(localStorage.getItem("gamePlay")).round
       PointForm.PointFormComponent(round)

    })
}

//increases points on the local storage object 
const increasePoints = () => {
    //current gamePlay object in local storage
    let localStorageGamePlay = JSON.parse(localStorage.getItem("gamePlay"))

    //id's associated with each team
    let teamOneId = localStorageGamePlay.team_1[0]
    let teamTwoId = localStorageGamePlay.team_2[0]
    let teamThreeId = localStorageGamePlay.team_3[0]

    //adds team scores from previous round together with current selections
    localStorageGamePlay.team_1[1] = localStorageGamePlay.team_1[1] + parseInt(document.getElementById(`team_${teamOneId}`).value)
    localStorageGamePlay.team_2[1] = localStorageGamePlay.team_2[1] + parseInt(document.getElementById(`team_${teamTwoId}`).value)
    localStorageGamePlay.team_3[1] = localStorageGamePlay.team_3[1] + parseInt(document.getElementById(`team_${teamThreeId}`).value)

    //increases round by 1
    localStorageGamePlay.round = localStorageGamePlay.round + 1

    return localStorageGamePlay
}

//listens for the next round event, triggering re-render and point increase
const nextRoundListener = () => {
    container.addEventListener("click", (evt) => {

        if (evt.target.id === "nextRoundBtn") {

            let round = JSON.parse(localStorage.getItem("gamePlay")).round
            if (round < 3){
                let localStorageGamePlay = increasePoints()

                //sets new gamePlay object into local storage
                localStorage.setItem("gamePlay",JSON.stringify(localStorageGamePlay))
                //renders component with new round int
                PointForm.PointFormComponent(JSON.parse(localStorage.getItem("gamePlay")).round)
            }
            else if( round === 3){
                let localStorageGamePlay = increasePoints()
                //sets new gamePlay object into local storage
                localStorage.setItem("gamePlay",JSON.stringify(localStorageGamePlay))
                console.log(localStorageGamePlay)

                let teamOneId = localStorageGamePlay.team_1[0]
                let teamTwoId = localStorageGamePlay.team_2[0]
                let teamThreeId = localStorageGamePlay.team_3[0]

                let teamOneScore = localStorageGamePlay.team_1[1]
                let teamTwoScore = localStorageGamePlay.team_2[1]
                let teamThreeScore = localStorageGamePlay.team_3[1]

                const teamOneObject = {
                    teamId: teamOneId,
                    teamScore:teamOneScore
                }
                const teamTwoObject = {
                    teamId: teamOneId,
                    teamScore:teamTwoScore
                }
                const teamThreeObject = {
                    teamId: teamOneId,
                    teamScore:teamThreeScore
                }

                const message = new CustomEvent("gameOver", {
                    detail:{
                        teamOneScore: teamOneObject,
                        teamTwoScore: teamTwoObject,
                        teamThreeScore: teamThreeObject
                    }
                })
                eventHub.dispatchEvent(message)
            }
        }
    })
}

const playerInputHTML = (gamePlayObject) => {

    let teamState = currentTeamsState()

    let teamOneId = gamePlayObject.team_1[0]
    let teamTwoId = gamePlayObject.team_2[0]
    let teamThreeId = gamePlayObject.team_3[0]


    let playingTeamsHTML = teamState.filter(team => team.id === teamOneId || team.id === teamTwoId || team.id === teamThreeId).map((team, index) => `
    <div className="form-group">
    <label htmlFor="teamPoints">${team.name}</label>
    <input type="number" id=team_${team.id} className="form-control"/>
    </div>`).join(" ")

    return playingTeamsHTML


}

const formContainerHTML = (round) => `
<div class="addPointForm">
   <h4>Round ${round}</h4>
    ${playerInputHTML(JSON.parse(localStorage.getItem("gamePlay")))}
   <button id="nextRoundBtn"> Next Round </button>
</div>`



export const PointForm = {


    PointFormComponent : (round) => {
        container.innerHTML = formContainerHTML(round)
    },

    applyPointFormListeners : () => {
        roundPhaseListener()
        nextRoundListener()
    }


}
