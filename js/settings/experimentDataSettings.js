function createDataExperimentObject(){
    var dataExperimentObject = {}
    let userName = document.getElementById("nameField").value
    if(userName == ""){
        alert("please fill out the name field")
        return false
    }
    let lingVar = document.getElementById("varField").value
    if(lingVar == ""){
        alert("please fill out the variable field")
        return false
    }
    var dataExperimentObject = {
        "userName": userName,
        "lingVar": lingVar,
        "dataInputs": []
    }

    return dataExperimentObject
}

export{
    createDataExperimentObject
}