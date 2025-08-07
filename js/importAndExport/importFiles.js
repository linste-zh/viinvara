import {fillOutScaleSettings} from '../settings/scaleSettings.js'
import {fillOutSettings} from '../settings/experimentSettings.js'
import {fillOutExperimentDataSettings, createDataExperimentObject} from '../settings/experimentDataSettings.js'
import {setTheme} from '../settings/themeSettings.js'

var content

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

async function importSettings(){
    const file = await pickFile()
    const fileContent = await readFileAsText(file)

    content = JSON.parse(fileContent)
    return content
}

function verifyValidity(jsonContent, requireFull = false){
    return new Promise((resolve, reject) => {
        if(!jsonContent.hasOwnProperty("viinvaraFileType") || !jsonContent.hasOwnProperty("experimentData") || !jsonContent.hasOwnProperty("scale") || !jsonContent.hasOwnProperty("settings")){
            alert("The provided JSON is not a current Viinvara settings file.  Please try a different file.")
            reject()
        }else if(requireFull && jsonContent["viinvaraFileType"] != "full"){
            alert("The file you have provided is not a full settings file and thus is not valid for a remote experiment.")
            reject()
        }else{
            resolve()
        }
    })
}

/*partially done with ChatGPT*/
async function importSettingsForEdit(){
    await importSettings()
    await verifyValidity(content)

    setTheme(content["theme"])

    const accordions = document.getElementsByClassName("settingAccordionTrigger")
    console.log(accordions)
    for(let i = 0; i < accordions.length; i++){
        console.log(i)
        console.log(accordions[i])
        accordions[i].click()
    }

    fillOutExperimentDataSettings(content["experimentData"])
    fillOutScaleSettings(content["scale"])
    fillOutSettings(content["settings"])
    if(document.getElementById("msgField")){
        document.getElementById("msgField").value = content["message"]
    }
}

async function importSettingsForRemoteEx(){
    await importSettings()
    await verifyValidity(content, true)

    setTheme(content["theme"])

    localStorage.setItem("scaleObject", JSON.stringify(content["scale"]))
    console.log(localStorage.getItem("scaleObject"))
    localStorage.setItem("settingsObject", JSON.stringify(content["settings"]))
    console.log(localStorage.getItem("settingsObject"))
    localStorage.setItem("experimentDataObject", JSON.stringify(content["experimentData"]))
    console.log(localStorage.getItem("experimentDataObject"))
    if(content["experimentData"]["userName"] != ""){
        document.getElementById("nameField").value = content["experimentData"]["userName"]
    }

    document.getElementById("infoField").innerHTML = ""

    if(content["message"] != ""){
        createMsgBox(content["message"])
    }
    createButtons()
}

function createMsgBox(infoText){
    if(infoText == ""){
        return false
    }

    var infoBox = document.createElement("div")
    infoBox.classList.add("msgField")
    infoBox.innerHTML = infoText
    document.getElementById("infoField").append(infoBox)
}

function createButtons(){
    var buttonField = document.createElement("div")
    buttonField.classList.add("buttonField")
    buttonField.id = "buttonField"
    document.getElementById("infoField").appendChild(buttonField)

    var changeFileButton = document.createElement("button")
    changeFileButton.innerHTML = "change file <img class='btnIcon' src='./media/refresh.png'>"
    changeFileButton.classList.add("mediumButton")
    changeFileButton.onclick = importSettingsForRemoteEx
    document.getElementById("buttonField").appendChild(changeFileButton)

    var startButton = document.createElement("button")
    startButton.classList.add("mediumButton")
    startButton.innerHTML = "go to experiment <img class='btnIcon' src='./media/play_icon.png'>"
    startButton.onclick =  startRemoteExperiment
    document.getElementById("buttonField").appendChild(startButton)   
}


function startRemoteExperiment(){
    var experimentDataObject = createDataExperimentObject(content["experimentData"]["lingVar"])

    localStorage.setItem("experimentDataObject", JSON.stringify(experimentDataObject))
    window.location.href="experiment.html"
}

export{
    importSettingsForEdit,
    importSettingsForRemoteEx
}