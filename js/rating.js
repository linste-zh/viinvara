import {activeExperimentState, experimentData, settings, scale} from './experiment.js';
import {pauseVideo, playVideo} from './video.js';


function applyScale(){
    let fullScale = []
    let hasLabels = false
    for(var index in scale){
        fullScale.push(scale[index]["value"])
        if(scale[index]["label"] != ""){
            hasLabels = true
        }
    }

    if(hasLabels){
        activeExperimentState.ratingElement.style.gridTemplateRows = "70% 30%;";
    }else{
        activeExperimentState.ratingElement.style.gridTemplateRows = "100% 0%;";
    }
    
    Object.values(scale).forEach(index => {
        let button = document.createElement('button');
        button.textContent = index.value;
        button.classList.add('ratingButton');
        button.addEventListener("click", () => submit(index.value));

        let buttonDiv = document.createElement('div');
        buttonDiv.className = "ratingGridDiv"
        buttonDiv.style = "grid-row: 1;";
        buttonDiv.appendChild(button)
        activeExperimentState.ratingElement.appendChild(buttonDiv);

        if(hasLabels){
            let label = document.createElement('p');
            label.textContent = index.label;
            label.classList.add('buttonLabel');

            let labelDiv = document.createElement('div');
            labelDiv.className = "ratingGridDiv"
            labelDiv.style = "grid-row: 2;";
            labelDiv.appendChild(label)
            activeExperimentState.ratingElement.appendChild(labelDiv);
        }
    })
}

function checkIfRatingRequired(pausingBehaviour = () => {}){
    localStorage.setItem("currentTimeStamp", Math.floor(activeExperimentState.videoElement.currentTime * 100)/100)
    activeExperimentState.currentTimeStamp = Math.floor(activeExperimentState.videoElement.currentTime * 100)/100

    activeExperimentState.currentInterval = Math.floor(activeExperimentState.currentTimeStamp / activeExperimentState.interval) * activeExperimentState.interval
    console.log("current interval: " + activeExperimentState.currentInterval)

    let timeUntilNextRating = activeExperimentState.currentInterval + activeExperimentState.interval - activeExperimentState.currentTimeStamp 
    if(activeExperimentState.pendingRating && timeUntilNextRating < 0.5){
        notRatedInTime()
    }

    let timeInS = Math.floor(activeExperimentState.videoElement.currentTime)
    if(intervalContained(activeExperimentState.currentInterval)){        
        return false
    }else if(timeInS > 0 && timeInS % activeExperimentState.interval == 0 && !activeExperimentState.pendingRating){
        activateRating(pausingBehaviour)
        return true
    }
}

function notRatedInTime(){
    let behaviour = settings["notRatedBehaviour"]

    if(behaviour == "pause"){
        pauseVideo()
    }else if(behaviour == "empty"){
        activeExperimentState.pendingRating = false
    }else if(behaviour == "neutral"){
        submit(activeExperimentState.neutralRating)
    }
}

function activateRating(pausingBehaviour = () => {}){
    activeExperimentState.pendingRating = true
    pausingBehaviour()
    playSound()
    activeExperimentState.ratingElement.style.visibility = "visible"
}

class DataPoint{
    constructor(time, interval, rating){
        this.timeOfRating = time;
        this.associatedInterval = interval;
        this.rating = rating;
    }
}

function intervalContained(interval){
    let inputs = experimentData["dataInputs"]

    for (var i in inputs){
        if(inputs[i].associatedInterval == interval){
            return true
        }
    }
    return false
}  

function keyPressed(e){
    let keyValue = e.key
    if(isNaN(keyValue)){
        return
    }
    if(keyValue == 0){
        keyValue = 10
    }
    keyValue -= 1

    if(keyValue in Object.values(scale) && activeExperimentState.pendingRating){
        submit(scale[keyValue].value)
    }
}

function submit(rating){
    let dp = new DataPoint(activeExperimentState.currentTimeStamp, activeExperimentState.currentInterval, rating)
    addDataPoint(dp)
    activeExperimentState.ratingElement.style.visibility = "hidden"
    if(!activeExperimentState.videoOver){
        playVideo()
    }
}

function addDataPoint(dp){
    let inputs = experimentData["dataInputs"]

    inputs.push(dp)
    experimentData["dataInputs"] =  inputs
    localStorage.setItem("experimentDataObject", JSON.stringify(experimentData))
    
    console.log(experimentData)

    activeExperimentState.pendingRating = false
}

function playSound(){
    if(settings["sound"] == "none"){
        return
    }

    activeExperimentState.videoElement.volume = 0.7
    document.getElementById("soundPlayer").play()
}

export{
    applyScale,
    activateRating,
    addDataPoint,
    submit,
    checkIfRatingRequired,
    playSound,
    keyPressed,
    intervalContained
}