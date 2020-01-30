import { AddPlayerForm } from "./components/AddPlayerForm.js"
import { AddTeamForm } from "./components/AddTeamForm.js"
import { BeginGame } from "./components/BeginGame.js"
import { teamListener, getTeams } from "./providers/TeamProvider.js"
import { playerListener } from "./providers/PlayerProvider.js"

const { AddPlayerFormComponent, applyPlayerFormListeners } = AddPlayerForm
const { AddTeamFormComponent, applyTeamFormListeners } = AddTeamForm
const { BeginGameComponent, applyBeginGameListeners } = BeginGame

getTeams()
.then(() => AddPlayerFormComponent())

AddTeamFormComponent()
BeginGameComponent()

applyBeginGameListeners()
applyPlayerFormListeners()
applyTeamFormListeners()

teamListener()
playerListener()

