import {createScaleObject} from './scaleSettings.js'
import {createSettingsObject} from './experimentSettings.js'
import {createDataExperimentObject} from './experimentDataSettings.js'

function loadExperiment(){
    var fullSettingObject = createObjects()
    if(fullSettingObject["experimentData"]["userName"] == ""){
        alert("please fill out the user name field")
        return false
    }
    if(fullSettingObject["experimentData"]["lingVar"] == ""){
        alert("please fill out the variable field")
        return false
    }
    window.location.href="experiment.html"
}


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
    createObjects,
    loadExperiment
}