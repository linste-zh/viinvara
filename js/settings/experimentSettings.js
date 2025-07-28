var currentSound = "none"

function createSettingsObject(){
    var settingObject = {}

    let interval = document.getElementById("interval_input").value
    if(interval == ""){
        alert("Please provide valid interval.")
        return false
    }
    settingObject["interval"] = parseInt(interval)

    let pause = document.getElementById("pauseChecker").checked
    settingObject["pausing"] = pause

    let atStart = document.getElementById("startInputChecker").checked
    settingObject["inputAtStart"] = atStart

    let atEnd = document.getElementById("endInputChecker").checked
    settingObject["inputAtEnd"] = atEnd

    let checked_option = document.querySelector('input[name = "notRatedBehaviour"]:checked').value;
    settingObject["notRatedBehaviour"] = checked_option

    settingObject["sound"] = currentSound

    let controls = document.getElementById("vcChecker").checked
    settingObject["controls"] = controls

    let fullscreen = document.getElementById("fullscreenChecker").checked
    settingObject["fullscreen"] = fullscreen

    return settingObject
}

function enforceInterval(){
    let el = document.getElementById("interval_input")
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
    let picked = document.getElementById("notificationSound").value
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

    if(currentSound == "none"){
        return
    }else{
        soundPlayer.play()
        document.getElementById("soundIcon").src = "./media/playing_icon.png"
        soundPlayer.onended = () => {document.getElementById("soundIcon").src = "./media/play_icon.png"}
    }
}


function updateControlSettings(){
    if(document.getElementById("vcChecker").checked){
        document.getElementById("fullScreenSwitch").style.display = "flex"
    }else{
        document.getElementById("fullScreenSwitch").style.display = "none"
    }

    let accordionContainer = document.getElementById("fullScreenSwitch").closest(".settingAccordion");
    setTimeout(() => {
        accordionContainer.style.maxHeight = accordionContainer.scrollHeight + "px";
    }, 20);
}


function updateNoRatingSettings(){
    if(document.getElementById("pauseChecker").checked){
        document.getElementById("noRatingProvided").style.display = "none"
    }else{
        document.getElementById("noRatingProvided").style.display = "block"
    }

    let accordionContainer = document.getElementById("pauseChecker").closest(".settingAccordion")
    setTimeout(() => {
        accordionContainer.style.maxHeight = accordionContainer.scrollHeight + "px"
    }, 20);
}


function fillOutSettings(settingsInfo){
    document.getElementById("interval_input").value = settingsInfo["interval"]
    document.getElementById("pauseChecker").checked = settingsInfo["pausing"]
    updateNoRatingSettings()
    
    document.getElementById("startInputChecker").checked = settingsInfo["inputAtStart"]
    document.getElementById("endInputChecker").checked = settingsInfo["inputAtEnd"]
    
    document.getElementById(settingsInfo["notRatedBehaviour"]).checked = true

    let sound = settingsInfo["sound"]
    sound = sound.replace('./media/', '')
    console.log(sound)
    document.getElementById("notificationSound").value = sound
    setSound()
    
    document.getElementById("vcChecker").checked = settingsInfo["controls"]
    document.getElementById("fullscreenChecker").checked = settingsInfo["fullscreen"]
    updateControlSettings()
}

export{
    createSettingsObject,
    fillOutSettings,
    enforceInterval,
    setSound,
    testSound,
    updateControlSettings,
    updateNoRatingSettings
}