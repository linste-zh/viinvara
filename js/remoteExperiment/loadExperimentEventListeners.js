import {importFullSettings} from '../importAndExport/importFiles.js'

document.getElementById("remoteSettingsImportButton").addEventListener("click", importFullSettings)
window.importFullSettings = importFullSettings