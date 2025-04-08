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
    if(interval == ""){
        interval = 60;
    }
    localStorage.setItem("interval", interval)

    localStorage.setItem("dataInputs", "")

    scale_start = document.getElementById("scale_start_input").value
    scale_end = document.getElementById("scale_end_input").value
    if(scale_start == ""){
        scale_start = 1;
    }
    if(scale_end == ""){
        scale_end = 9;
    }
    scale = [scale_start, scale_end]
    localStorage.setItem("scale", JSON.stringify(scale))

    pause = document.getElementById("pauseChecker").checked
    localStorage.setItem("pausing", pause)

    atStart = document.getElementById("startInputChecker").checked
    localStorage.setItem("inputAtStart", atStart)

    atEnd = document.getElementById("endInputChecker").checked
    localStorage.setItem("inputAtEnd", atEnd)

    checked_option = document.querySelector('input[name = "notRatedBehaviour"]:checked').value;
    localStorage.setItem("notRatedBehaviour", checked_option)
}

function enforceInterval(el){
    if(el.value == ""){
        return
    }

    if(el.value < 1){
        el.value = 1;
    }else if(el.value > 3600){
        el.value = 3600;
    }
}

function enforceScale(el){
    scale_start = parseInt(document.getElementById("scale_start_input").value)
    scale_end = parseInt(document.getElementById("scale_end_input").value)

    fullScale = []
    for (let i = scale_start; i <=  scale_end; i++) {
        fullScale.push(i);
    }

    if(fullScale.length > 10){
        if(el.id == "scale_start_input"){
            el.value = scale_end - 9
        }else{
            el.value = scale_start + 9
        }
    }else if(scale_start >= scale_end){
        if(el.id == "scale_start_input"){
            el.value = scale_end - 1
        }else{
            el.value = scale_start + 1
        }
    }

    
}

function reset(){
    if (confirm("Return to start page? This will reset all your data and variables.")){
        localStorage.removeItem("interval")
        localStorage.removeItem("scale")
        localStorage.removeItem("pausing")
        localStorage.removeItem("dataInputs")
        localStorage.removeItem("userName")
        localStorage.removeItem("lingVar")
        localStorage.removeItem("notRatedBehaviour")
        localStorage.removeItem("inputAtEnd")
        localStorage.removeItem("inputAtStart")        

        window.location.href="index.html"
    }else{
        console.log("cancelled")
    }
}