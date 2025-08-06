import {setTheme} from '../settings/themeSettings.js'
document.getElementById("greenThemeButton").addEventListener("click", () => setTheme("green"))
document.getElementById("pinkThemeButton").addEventListener("click", () => setTheme("pink"))
document.getElementById("blueThemeButton").addEventListener("click", () => setTheme("blue"))
document.getElementById("grayThemeButton").addEventListener("click", () => setTheme("gray"))
window.setTheme = setTheme

import {loadExperiment} from '../settings/settings.js'

document.getElementById("experimentStartButton").addEventListener("click", loadExperiment)
window.loadExperiment = loadExperiment


import {exportSettings} from '../importAndExport/exportFiles.js'

document.getElementById("settingsExportButton").addEventListener("click", () => {
    window.alert("This is only a minimal settings file. It cannot be used for a remote experiment.\nTo create full settings file, go to the 'Create Experiment' page.")
    exportSettings(false)
})
window.exportSettings = exportSettings


import {importSettingsForEdit} from '../importAndExport/importFiles.js'

document.getElementById("settingsImportButton").addEventListener("click", importSettingsForEdit)
window.importSettingsForEdit = importSettingsForEdit
