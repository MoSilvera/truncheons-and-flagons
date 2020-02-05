import { AddPlayerForm } from "./components/AddPlayerForm.js"
import { AddTeamForm } from "./components/AddTeamForm.js"
import { BeginGame } from "./components/BeginGame.js"
import { teamListener, getTeams } from "./providers/TeamProvider.js"
import { playerListener } from "./providers/PlayerProvider.js"
import { PointForm } from "./components/PointForm.js"
import { TeamSelectionForm } from "./components/TeamSelectionForm.js"
import { teamScoreListener } from "./providers/TeamScoreProvider.js"
import { gameListener } from "./providers/GameProvider.js"
import { scoreKeeper } from "./components/GameScore.js"
import { leaderBoard } from "./components/LeaderBoard.js"

const { AddPlayerFormComponent, applyPlayerFormListeners } = AddPlayerForm
const { AddTeamFormComponent, applyTeamFormListeners } = AddTeamForm
const { BeginGameComponent, applyBeginGameListeners } = BeginGame
const { applyPointFormListeners } = PointForm
const { applyTeamSelectionListeners } = TeamSelectionForm
const { ScoreComponent, applyScoreKeeperListeners } = scoreKeeper
const { LeaderBoardComponent, applyLeaderBoardListeners } = leaderBoard

applyPointFormListeners()
applyTeamSelectionListeners()
applyBeginGameListeners()
applyPlayerFormListeners()
applyTeamFormListeners()
applyScoreKeeperListeners()
applyLeaderBoardListeners()
teamListener()
playerListener()
teamScoreListener()
gameListener()



getTeams()
.then(() => AddPlayerFormComponent())
.then(() => BeginGameComponent() )
.then(() => AddTeamFormComponent())
.then(() => ScoreComponent())
.then(() => LeaderBoardComponent())







