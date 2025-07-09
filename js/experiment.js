import { playVideo, pauseVideo } from './video.js';
import { applyScale, activateRating, keyPressed, intervalContained, submit } from './rating.js';

const activeExperimentState = {
    currentInterval: 0,
    pendingRating: false,
    interval: 60,
    currentTimeStamp: 0,
    videoOver: false
    //videoContainer
    //videoElement
    //ratingElement
}

const experimentData = JSON.parse(localStorage.getItem("experimentDataObject"))
const scale = JSON.parse(localStorage.getItem("scaleObject"))
const settings = JSON.parse(localStorage.getItem("settingsObject"))
var hasEnded = false

function setup(){
    document.getElementsByTagName("body")[0].style = localStorage.getItem("theme")
    document.getElementsByTagName("body")[0].addEventListener("keydown", (event) => {keyPressed(event)})
    
    activeExperimentState.videoContainer = document.getElementById("videoContainer")
    activeExperimentState.ratingElement = document.getElementById("ratingScale")

    activeExperimentState.interval = settings["interval"]

    fullScale = []
    for(var index in scale){
        fullScale.push(scale[index]["value"])
    }

    if(settings["notRatedBehaviour"] == "neutral"){
        if(fullScale.length % 2 != 0){
            var middle = fullScale[Math.floor(fullScale.length / 2)];
        }else{
            var middle = fullScale[Math.floor(fullScale.length / 2)] - 0.5;
        }
        activeExperimentState.neutralRating = middle
    }

    document.getElementById("soundPlayer").src = settings["sound"] === "none" ? "" : settings["sound"];

    if(experimentData["dataInputs"].length == 0){
        localStorage.setItem("currentTimeStamp", 0)    
    }

    let instruction = String("<b>" + experimentData["userName"] + "</b>, please rate this video based on <b>" + experimentData["lingVar"] + "</b>")
    document.getElementById("instruction").innerHTML = instruction

    console.log(activeExperimentState)
    console.log(experimentData)
    console.log(settings)
    console.log(scale)
    console.log(localStorage.getItem("currentTimeStamp"))
}

window.addEventListener("DOMContentLoaded", () => {
    setup();
});
window.setup = setup

function start(){
    settings["videoDuration"] = activeExperimentState.videoElement.duration
    localStorage.setItem("settingsObject", JSON.stringify(settings))

    activeExperimentState.ratingElement.innerHTML = ""
    applyScale()
    activeExperimentState.ratingElement.style.visibility = "hidden"

    if(activeExperimentState.currentInterval == 0 && settings["inputAtStart"] && !intervalContained(0)){
        activateRating()
        const startInterval = setInterval(function () {
            if(!activeExperimentState.pendingRating){
                playVideo()
                clearInterval(startInterval)
            }
        }, 500);
    }else{
        if(activeExperimentState.pendingRating){
            activateRating()
        }
        playVideo()
    }
}
window.start = start

function end(){
    activeExperimentState["videoOver"] = true
    if(activeExperimentState.pendingRating && !intervalContained(activeExperimentState.currentInterval)){
        let behaviour = settings["notRatedBehaviour"]
        if(behaviour == "pause"){
            let endInterval = setInterval(function () {
            if(!activeExperimentState.pendingRating){
                clearInterval(endInterval)
                window.location.href="results.html"
            }
        }, 500);
        }else if(behaviour == "empty"){
            activeExperimentState.pendingRating = false
            end()
        }else if(behaviour == "neutral"){
            submit(activeExperimentState.neutralRating)
            hasEnded = false
            end()
        }
    }else if(settings["inputAtEnd"] && !intervalContained(settings.videoDuration)){
        activeExperimentState.currentInterval = settings.videoDuration
        activateRating()
        let endInterval = setInterval(function () {
            if(!activeExperimentState.pendingRating){
                clearInterval(endInterval)
                window.location.href="results.html"
            }
        }, 500);
    }else{
        window.location.href="results.html"
    }
}

function exitExperiment(){
    if(activeExperimentState.videoElement){
        pauseVideo()
    }
   
    if (confirm("Continue to the results already? This will prematurely end your experiment.")){
        window.location.href="results.html"
    }else{
        if(activeExperimentState.videoElement){
            playVideo()
        }
    }
}
document.getElementById("exitButton").addEventListener("click", () => {
    exitExperiment();
});
window.exitExperiment = exitExperiment


export {
    setup,
    start,
    end,
    exitExperiment,
    activeExperimentState,
    experimentData,
    scale,
    settings
};