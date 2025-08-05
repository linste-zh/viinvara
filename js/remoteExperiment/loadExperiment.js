import {pickFile, readFileAsText} from '../settings/settingsImportExport.js'
import {createDataExperimentObject} from '../settings/experimentDataSettings.js'
import {setTheme} from '../headerFunctions.js'

var content

async function importFullSettings(){
    const file = await pickFile()
    const fileContent = await readFileAsText(file);
    content = JSON.parse(fileContent);

    if(!content.hasOwnProperty("scale") || !content.hasOwnProperty("settings") ){
        alert("The provided JSON does not contain the expected content.  Please try a different file.")
        return
    }

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

    content["infoBox"] = ""
    if(content["infoBox"] != ""){
        createInfoBox(content["infoBox"])
    }



    var startButton = document.createElement("button")
    startButton.classList.add("startButton")
    startButton.textContent = "start Experiment"
    startButton.addEventListener("click", startExperiment);
    document.getElementById("infoField").append(startButton)
}
document.getElementById("settingsImportButton").addEventListener("click", importFullSettings)
window.importFullSettings = importFullSettings


function createInfoBox(infoText){
    if(infoText == ""){
        return false
    }

    var infoBox = document.createElement("div")
    infoBox.classList.add("infoText")
    infoBox.innerHTML = infoText
    document.getElementById("infoField").append(infoBox)
}


function startExperiment(){
    experimentDataObject = createDataExperimentObject(content["lingVar"])

    localStorage.setItem("experimentDataObject", JSON.stringify(experimentDataObject))
}