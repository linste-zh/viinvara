import {setTheme} from '../headerFunctions.js'
document.getElementById("greenThemeButton").addEventListener("click", () => setTheme("green"))
document.getElementById("pinkThemeButton").addEventListener("click", () => setTheme("pink"))
document.getElementById("blueThemeButton").addEventListener("click", () => setTheme("blue"))
document.getElementById("grayThemeButton").addEventListener("click", () => setTheme("gray"))
window.setTheme = setTheme

import {loadExperiment} from '../settings/settings.js'

document.getElementById("experimentStartButton").addEventListener("click", loadExperiment)
window.loadExperiment = loadExperiment


import {exportMinSettings} from '../importAndExport/exportFiles.js'

document.getElementById("settingsExportButton").addEventListener("click", exportMinSettings)
window.exportMinSettings = exportMinSettings


import {importMinSettings} from '../importAndExport/importFiles.js'

document.getElementById("settingsImportButton").addEventListener("click", importMinSettings)
window.importMinSettings = importMinSettings
