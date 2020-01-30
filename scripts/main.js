import { AddPlayerForm } from "./components/AddPlayerForm.js"
import { newListener } from "./providers/PlayerProvider.js"
import { AddTeamForm } from "./components/AddTeamForm.js"
import {teamListener} from "./providers/TeamProvider.js"

const { AddPlayerFormComponent, applyPlayerFormListeners } = AddPlayerForm
const { AddTeamFormComponent, applyTeamFormListeners } = AddTeamForm

AddPlayerFormComponent()
AddTeamFormComponent()
applyPlayerFormListeners()
applyTeamFormListeners()
teamListener()
newListener()



