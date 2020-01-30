import { AddPlayerForm } from "./components/AddPlayerForm.js"
import { AddTeamForm } from "./components/AddTeamForm.js"
import { BeginGame } from "./components/BeginGame.js"
import { teamListener, getTeams } from "./providers/TeamProvider.js"
import { playerListener } from "./providers/PlayerProvider.js"
import { PointForm } from "./components/PointForm.js"
import { TeamSelectionForm } from "./components/TeamSelectionForm.js"

const { AddPlayerFormComponent, applyPlayerFormListeners } = AddPlayerForm
const { AddTeamFormComponent, applyTeamFormListeners } = AddTeamForm
const { BeginGameComponent, applyBeginGameListeners } = BeginGame
const { applyPointFormListeners } = PointForm
const { applyTeamSelectionListeners } = TeamSelectionForm

applyPointFormListeners()
applyTeamSelectionListeners()
applyBeginGameListeners()
applyPlayerFormListeners()
applyTeamFormListeners()

getTeams()
.then(() => AddPlayerFormComponent())
AddTeamFormComponent()
BeginGameComponent()



teamListener()
playerListener()

