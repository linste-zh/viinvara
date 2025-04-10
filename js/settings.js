settingsObject = {}
fullScale = []
fullScaleLabels = []
scaleChanged = true
currentSound = "none"

function loadExperiment(){
    experimentDataObject = createDataExperimentObject()
    if(!experimentDataObject){
        return
    }
    localStorage.setItem("experimentDataObject", JSON.stringify(experimentDataObject))
    console.log(localStorage.getItem("experimentDataObject"))

    scaleObject = createScaleObject()
    if(!scaleObject){
        return
    }
    localStorage.setItem("scaleObject", JSON.stringify(scaleObject))
    console.log(localStorage.getItem("scaleObject"))

    settingsObject = createSettingsObject()
    if(!settingsObject){
        return
    }
    localStorage.setItem("settingsObject", JSON.stringify(settingsObject))
    console.log(localStorage.getItem("settingsObject"))

    window.location.href="experiment.html"
}

function createDataExperimentObject(){
    dataExperimentObject = {}
    userName = document.getElementById("nameField").value
    if(userName == ""){
        alert("please fill out the name field")
        return false
    }
    lingVar = document.getElementById("varField").value
    if(lingVar == ""){
        alert("please fill out the variable field")
        return false
    }
    dataExperimentObject = {
        "userName": userName,
        "lingVar": lingVar,
        "dataInputs": []
    }

    return dataExperimentObject
}

function createScaleObject(){
    wantLabels = document.getElementById("labelChecker").checked
    
    fullScale = getCurrentFullScale()
    if(fullScale.length < 2){
        alert("Please provide a valid scale.")
        return false
    }

    ensureMinLengthLabelsArray()

    scaleObject = {}
    for(let i = 0; i < fullScale.length; i++){
        label = ""
        if(i < fullScaleLabels.length && wantLabels){
            label = fullScaleLabels[i]
        }

        scaleObject[i] = {
            "value": fullScale[i],
            "label": label
        }
    }

    return scaleObject
}

function createSettingsObject(){
    settingObject = {}

    interval = document.getElementById("interval_input").value
    if(interval == ""){
        alert("Please provide valid interval.")
        return false
    }
    settingObject["interval"] = parseInt(interval)

    pause = document.getElementById("pauseChecker").checked
    settingObject["pausing"] = pause

    atStart = document.getElementById("startInputChecker").checked
    settingObject["inputAtStart"] = atStart

    atEnd = document.getElementById("endInputChecker").checked
    settingObject["inputAtEnd"] = atEnd

    checked_option = document.querySelector('input[name = "notRatedBehaviour"]:checked').value;
    settingObject["notRatedBehaviour"] = checked_option

    settingObject["sound"] = currentSound

    return settingObject
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

function setSound(){
    picked = document.getElementById("notificationSound").value
    if(picked == "none"){
        return
    }
    currentSound = "./media/" + picked
    document.getElementById("soundPlayer").src = currentSound
}

//image source: https://www.flaticon.com/free-icon/play_3318660?term=play&page=1&position=1&origin=style&related_id=3318660
//image source: https://www.flaticon.com/free-icon/sound-waves_7582349?term=playing+sound&page=1&position=1&origin=search&related_id=7582349
function testSound(){
    soundPlayer = document.getElementById("soundPlayer")
    console.log(currentSound)

    if(currentSound == "none"){
        return
    }else{
        soundPlayer.play()
        document.getElementById("soundIcon").src = "./media/playing_icon.png"
        soundPlayer.onended = () => {document.getElementById("soundIcon").src = "./media/play_icon.png"}
    }
}



function getCurrentFullScale(){
    scale_start = parseInt(document.getElementById("scale_start_input").value)
    scale_end = parseInt(document.getElementById("scale_end_input").value)

    curFullScale = []
    for (let i = scale_start; i <=  scale_end; i++) {
        curFullScale.push(i);
    }

    return curFullScale
}

function updateScale(el){
    scaleChanged = true
    curFullScale = getCurrentFullScale()

    //enforce valid scale
    if(curFullScale.length > 10){
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
    
    fullScale = getCurrentFullScale()

    ensureMinLengthLabelsArray()
    updateLabelSettings()
}

function ensureMinLengthLabelsArray(){
    while(fullScale.length > fullScaleLabels.length){
        fullScaleLabels.push("")
    }
    return fullScaleLabels
}


function updateLabelSettings(){
    if(document.getElementById("labelChecker").checked){
        displayScaleLableInputs()
    }else{
        document.getElementById("labelSettings").style.display = "none"
    }

    //note: decrease not nicely animated yet
    let accordionContainer = document.getElementById("labelSettings").closest(".settingAccordion");
    setTimeout(() => {
        accordionContainer.style.maxHeight = accordionContainer.scrollHeight + "px";
    }, 20);
}

function displayScaleLableInputs(){
    labelSettingElement =  document.getElementById("labelSettings")
    fullScale = getCurrentFullScale()
    
    if(scaleChanged){
        ensureMinLengthLabelsArray()

        labelSettingElement.innerHTML = ""

        for(let i = 0; i < fullScale.length; i++){
            value = fullScale[i]
            label = ""
            if(i < fullScaleLabels.length){
                label = fullScaleLabels[i]
            }

            let curElLabel = document.createElement('label');
            curElLabel.innerHTML = value;
            curElLabel.for = i
            //curLabel.classList.add('ratingButton');
            labelSettingElement.appendChild(curElLabel);

            let curElInput = document.createElement('input');
            curElInput.id = i
            curElInput.type = "text"
            curElInput.value = label
            curElInput.maxLength = 20
            curElInput.classList.add("labelInput")
            curElInput.onkeyup = () => {
                fullScaleLabels[parseInt(curElInput.id)] = curElInput.value
            }
            
            labelSettingElement.appendChild(curElInput);
        }

        scaleChanged = false
    }

    labelSettingElement.style.display = "grid"
    let accordionContainer = document.getElementById("labelSettings").closest(".settingAccordion");
    setTimeout(() => {
        accordionContainer.style.maxHeight = accordionContainer.scrollHeight + "px";
    }, 10);
}

function reset(){
    if (confirm("Return to start page? This will reset all your data and variables.")){
        localStorage.removeItem("experimentDataObject")
        localStorage.removeItem("scaleObject")
        localStorage.removeItem("settingsObject")

        window.location.href="index.html"
    }else{
        console.log("cancelled")
    }
}