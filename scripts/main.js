import { AddPlayerForm } from "./components/AddPlayerForm.js"
import { AddTeamForm } from "./components/AddTeamForm.js"
import { BeginGame } from "./components/BeginGame.js"
import { teamListener, getTeams } from "./providers/TeamProvider.js"
import { playerListener } from "./providers/PlayerProvider.js"
import { PointForm } from "./components/PointForm.js"
import { TeamSelectionForm } from "./components/TeamSelectionForm.js"
import { teamScoreListener } from "./providers/TeamScoreProvider.js"
import { gameListener } from "./providers/GameProvider.js"

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
teamListener()
playerListener()
teamScoreListener()
gameListener()

getTeams()
.then(() => AddPlayerFormComponent())
.then(() => BeginGameComponent() )
.then(() => AddTeamFormComponent())







