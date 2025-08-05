function createDataExperimentObject(presetVariable = ""){
    var dataExperimentObject = {}

    let userName = ""
    if(document.getElementById("varField")){
        userName = document.getElementById("nameField").value
    }else{
        alert("Cannot find name!")
        return false
    }

    let lingVar = ""
    if(presetVariable != ""){
        lingVar = presetVariable
    }else if(document.getElementById("varField")){
        lingVar = document.getElementById("varField").value
    }else{
        alert("Cannot find variable!")
        return false
    }

    var dataExperimentObject = {
        "userName": userName,
        "lingVar": lingVar,
        "dataInputs": []
    }

    return dataExperimentObject
}

function fillOutExperimentDataSettings(dataInfo){
    document.getElementById("nameField").value = dataInfo["userName"]
    document.getElementById("varField").value = dataInfo["lingVar"]
}

export{
    createDataExperimentObject,
    fillOutExperimentDataSettings
}