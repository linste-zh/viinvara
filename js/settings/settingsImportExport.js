import {createObjects} from './settings.js'
import {fillOutScaleSettings} from './scaleSettings.js'
import {fillOutSettings} from './experimentSettings.js'
import {fillOutExperimentDataSettings} from './experimentDataSettings.js'
import {setTheme} from '../headerFunctions.js'

/*partially done with ChatGPT*/
function exportMinSettings(){
    var fullSettingsObject = createObjects()
    
    if(fullSettingsObject){
        fullSettingsObject["theme"] = localStorage.getItem("theme")
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


/*partially done with ChatGPT*/
async function importMinSettings(){
    const file = await pickFile()
    const fileContent = await readFileAsText(file);
    const content = JSON.parse(fileContent);

    if(!content.hasOwnProperty("scale") || !content.hasOwnProperty("settings") ){
        alert("The provided JSON does not contain the expected content.  Please try a different file.")
        return
    }

    setTheme(content["theme"])

    fillOutExperimentDataSettings(content["experimentData"])
    fillOutScaleSettings(content["scale"])
    fillOutSettings(content["settings"])
}


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

export{
    importMinSettings,
    exportMinSettings,
    pickFile,
    readFileAsText
}