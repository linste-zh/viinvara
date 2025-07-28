import {createScaleObject} from './scaleSettings.js'
import {createSettingsObject} from './experimentSettings.js'
import {createDataExperimentObject} from './experimentDataSettings.js'

function loadExperiment(){
    createObjects()
    window.location.href="experiment.html"
}
document.getElementById("experimentStartButton").addEventListener("click", () => {
    loadExperiment();
});
window.loadExperiment = loadExperiment

function createObjects(includeExperimentData = true, includeScaleObject = true, includeSettingsObject = true){
    var createdObjects = {}

    if(includeExperimentData){
        var experimentDataObject = createDataExperimentObject()
        if(!experimentDataObject){
            return
        }
        localStorage.setItem("experimentDataObject", JSON.stringify(experimentDataObject))
        createdObjects["experimentData"] = experimentDataObject
    }
    
    if(includeScaleObject){
       var scaleObject = createScaleObject()
        if(!scaleObject){
            return
        }
        localStorage.setItem("scaleObject", JSON.stringify(scaleObject))
        createdObjects["scale"] = scaleObject
    }

    if(includeSettingsObject){
        var settingsObject = createSettingsObject()
        if(!settingsObject){
            return
        }
        localStorage.setItem("settingsObject", JSON.stringify(settingsObject))
        createdObjects["settings"] = settingsObject
    }
    
    return createdObjects
}


export{
    createObjects
}