import {setTheme} from '../headerFunctions.js'
document.getElementById("greenThemeButton").addEventListener("click", () => setTheme("green"))
document.getElementById("pinkThemeButton").addEventListener("click", () => setTheme("pink"))
document.getElementById("blueThemeButton").addEventListener("click", () => setTheme("blue"))
document.getElementById("grayThemeButton").addEventListener("click", () => setTheme("gray"))
window.setTheme = setTheme

import {loadExperiment} from '../settings/settings.js'

document.getElementById("experimentStartButton").addEventListener("click", loadExperiment)
window.loadExperiment = loadExperiment


import {enforceInterval, setSound, testSound, updateControlSettings, updateNoRatingSettings} from '../settings/experimentSettings.js'

document.getElementById("interval_input").addEventListener("keyup", enforceInterval)
window.enforceInterval = enforceInterval

document.getElementById("notificationSound").addEventListener("change", setSound)
window.setSound = setSound

document.getElementById("soundIcon").addEventListener("click", testSound)
window.testSound = testSound

document.getElementById("vcChecker").addEventListener("change", updateControlSettings)
window.updateControlSettings = updateControlSettings

document.getElementById("pauseChecker").addEventListener("change", updateNoRatingSettings)
window.updateNoRatingSettings = updateNoRatingSettings


import {updateScale, updateLabelSettings} from '../settings/scaleSettings.js'

document.getElementById("scale_start_input").addEventListener("keyup", updateScale)
document.getElementById("scale_start_input").addEventListener("change", updateScale)
document.getElementById("scale_end_input").addEventListener("keyup", updateScale)
document.getElementById("scale_end_input").addEventListener("change", updateScale)
window.updateScale = updateScale

document.getElementById("labelChecker").addEventListener("change", updateLabelSettings)
window.updateLabelSettings = updateLabelSettings


import {exportMinSettings, importMinSettings} from '../settings/settingsImportExport.js'

document.getElementById("settingsExportButton").addEventListener("click", exportMinSettings)
window.exportMinSettings = exportMinSettings

document.getElementById("settingsImportButton").addEventListener("click", importMinSettings)
window.importMinSettings = importMinSettings
