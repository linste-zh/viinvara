import {setTheme} from '../settings/themeSettings.js'
document.getElementById("greenThemeButton").addEventListener("click", () => setTheme("green"))
document.getElementById("pinkThemeButton").addEventListener("click", () => setTheme("pink"))
document.getElementById("blueThemeButton").addEventListener("click", () => setTheme("blue"))
document.getElementById("grayThemeButton").addEventListener("click", () => setTheme("gray"))
window.setTheme = setTheme

import {exportSettings} from '../importAndExport/exportFiles.js'

document.getElementById("remoteSettingsExportButton").addEventListener("click", () => exportSettings(true))
window.exportSettings = exportSettings


import {importSettingsForEdit} from '../importAndExport/importFiles.js'

document.getElementById("settingsImportButton").addEventListener("click", importSettingsForEdit)
window.importSettingsForEdit = importSettingsForEdit