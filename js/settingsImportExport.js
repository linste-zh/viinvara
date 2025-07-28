import {createObjects} from './settings.js'
import {fillOutScaleSettings} from './scaleSettings.js'
import {fillOutSettings} from './experimentSettings.js'
import {} from './experimentDataSettings.js'

/*partially done with ChatGPT*/
function exportSettings(){
    var fullSettingsObject = createObjects(false)
    var lingVar = document.getElementById("varField").value
    if(fullSettingsObject){
        let dataStr  = JSON.stringify(fullSettingsObject)
        const blob = new Blob([dataStr], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        let currentDate = new Date()
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentDate.getFullYear()}/${currentDate.getMonth()+1}/${currentDate.getDate()}_Viinvara_ExperimentSettings.json`
        a.click();

        URL.revokeObjectURL(url);
    }else{
        alert("Could not download settings. Check if all fields are filled.")
        return false
    }
}
document.getElementById("settingsExportButton").addEventListener("click", exportSettings)
window.exportSettings = exportSettings

/*partially done with ChatGPT*/
async function importSettings(){
    const file = await pickFile()
    const fileContent = await readFileAsText(file);
    const content = JSON.parse(fileContent);

    if(!content.hasOwnProperty("scale") || !content.hasOwnProperty("settings") ){
        alert("The provided JSON does not contain the expected content.  Please try a different file.")
        return
    }

    fillOutScaleSettings(content["scale"])
    fillOutSettings(content["settings"])
}
document.getElementById("settingsImportButton").addEventListener("click", importSettings)
window.importSettings = importSettings

function pickFile(){
     return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = ".json"
        input.style = "display: none;"
        input.onchange = () => {
            let files =   Array.from(input.files);
            let chosenDoc = files[0]
            if (chosenDoc) {
                resolve(chosenDoc);
            }else{
                reject("No JSON file selected.");
            }
        }

        input.click();
    });
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}
