function loadExperiment(){
    filledOut = submitNameAndVar()
    if(!filledOut){
        return
    }
    acceptSettings()

    window.location.href="experiment.html"
}
function submitNameAndVar(){
    userName = document.getElementById("nameField").value
    if(userName == ""){
        alert("please fill out the name field")
        return false
    }
    localStorage.setItem("userName", userName)
    lingVar = document.getElementById("varField").value
    if(lingVar == ""){
        alert("please fill out the variable field")
        return false
    }
    localStorage.setItem("lingVar", lingVar)

    return true
}

function acceptSettings(){
    interval = document.getElementById("interval_input").value
    localStorage.setItem("interval", interval)

    localStorage.setItem("dataInputs", "")

    scale_start = document.getElementById("scale_start_input").value
    scale_end = document.getElementById("scale_end_input").value
    scale = [scale_start, scale_end]
    localStorage.setItem("scale", JSON.stringify(scale))

    pause = document.getElementById("pauseChecker").checked
    localStorage.setItem("pausing", pause)

    atStart = document.getElementById("startInputChecker").checked
    localStorage.setItem("inputAtStart", atStart)

    atEnd = document.getElementById("startInputChecker").checked
    localStorage.setItem("inputAtEnd", atEnd)
}

function enforceInterval(el){
    
}

function enforceScale(el){

}

function reset(){
    if (confirm("Return to start page? This will reset all your data and variables.")){
        localStorage.removeItem("interval")
        localStorage.removeItem("scale")
        localStorage.removeItem("pausing")
        localStorage.removeItem("dataInputs")
        localStorage.removeItem("userName")
        localStorage.removeItem("lingVar")

        window.location.href="index.html"
    }else{
        console.log("cancelled")
    }
}