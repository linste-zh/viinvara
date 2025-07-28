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

document.getElementById("scale_start_input").addEventListener("keyup", () => {updateScale(this)});
document.getElementById("scale_start_input").addEventListener("change", () => {updateScale(this)});
document.getElementById("scale_end_input").addEventListener("keyup", () => {updateScale(this)});
document.getElementById("scale_end_input").addEventListener("change", () => {updateScale(this)});
window.updateScale = updateScale

document.getElementById("labelChecker").addEventListener("change", updateLabelSettings)
window.updateLabelSettings = updateLabelSettings


import {exportSettings, importSettings} from '../settings/settingsImportExport.js'

document.getElementById("settingsExportButton").addEventListener("click", exportSettings)
window.exportSettings = exportSettings

document.getElementById("settingsImportButton").addEventListener("click", importSettings)
window.importSettings = importSettings
