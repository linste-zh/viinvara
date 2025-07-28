var fullScale = []
var fullScaleLabels = []
var scaleChanged = true
var scale_start = parseInt(document.getElementById("scale_start_input").value)
var scale_end = parseInt(document.getElementById("scale_end_input").value)

function createScaleObject(){
    let wantLabels = document.getElementById("labelChecker").checked
    
    let fullScale = getCurrentFullScale()
    if(fullScale.length < 2){
        alert("Please provide a valid scale.")
        return false
    }

    ensureMinLengthLabelsArray()

    var scaleObject = {}
    for(let i = 0; i < fullScale.length; i++){
        let label = ""
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

function getCurrentFullScale(){
    scale_start = parseInt(document.getElementById("scale_start_input").value)
    scale_end = parseInt(document.getElementById("scale_end_input").value)

    let curFullScale = []
    for (let i = scale_start; i <=  scale_end; i++) {
        curFullScale.push(i);
    }

    return curFullScale
}

function updateScale(el){
    scaleChanged = true
    let curFullScale = getCurrentFullScale()

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
document.getElementById("scale_start_input").addEventListener("keyup", () => {updateScale(this)});
document.getElementById("scale_start_input").addEventListener("change", () => {updateScale(this)});
document.getElementById("scale_end_input").addEventListener("keyup", () => {updateScale(this)});
document.getElementById("scale_end_input").addEventListener("change", () => {updateScale(this)});
window.updateScale = updateScale

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
    let accordionContainer = document.getElementById("labelSettings").closest(".settingAccordion")
    setTimeout(() => {
        accordionContainer.style.maxHeight = accordionContainer.scrollHeight + "px"
    }, 20)
}
document.getElementById("labelChecker").addEventListener("change", updateLabelSettings)
window.updateLabelSettings = updateLabelSettings


function displayScaleLableInputs(){
    let labelSettingElement =  document.getElementById("labelSettings")
    let fullScale = getCurrentFullScale()
    
    if(scaleChanged){
        ensureMinLengthLabelsArray()

        labelSettingElement.innerHTML = ""

        for(let i = 0; i < fullScale.length; i++){
            let value = fullScale[i]
            let label = ""
            if(i < fullScaleLabels.length){
                label = fullScaleLabels[i]
            }

            let curElLabel = document.createElement('label');
            curElLabel.innerHTML = value;
            curElLabel.for = i
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

function fillOutScaleSettings(scaleInfo){
    let startValue = scaleInfo["0"]
    let endValue = scaleInfo[Object.keys(scaleInfo)[Object.keys(scaleInfo).length - 1]]
    document.getElementById("scale_start_input").value = startValue.value
    document.getElementById("scale_end_input").value = endValue.value
    let fullScale = getCurrentFullScale()
    scaleChanged = true

    fullScaleLabels = []
    document.getElementById("labelChecker").checked = false
    for(let key in scaleInfo){
        let scale = scaleInfo[key]
        fullScaleLabels.push(scale.label)
        if(scale.label != ""){
            document.getElementById("labelChecker").checked = true
        }
    }
    updateLabelSettings()
}   

export{
    createScaleObject,
    updateScale,
    updateLabelSettings,
    fillOutScaleSettings
}