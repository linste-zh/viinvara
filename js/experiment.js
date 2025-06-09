const activeExperimentState = {
    currentInterval: 0,
    pendingRating: false,
    interval: 60,
    currentTimeStamp: 0
    //videoContainer
    //videoElement
    //ratingElement
}


const experimentData = JSON.parse(localStorage.getItem("experimentDataObject"))
const scale = JSON.parse(localStorage.getItem("scaleObject"))
const settings = JSON.parse(localStorage.getItem("settingsObject"))

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
            middle = fullScale[Math.floor(fullScale.length / 2)];
        }else{
            middle = fullScale[Math.floor(fullScale.length / 2)] - 0.5;
        }
        activeExperimentState.neutralRating = middle
        console.log("neutral rating: " + middle)
    }

    document.getElementById("soundPlayer").src = settings["sound"] === "none" ? "" : settings["sound"];


    let instruction = String("<b>" + experimentData["userName"] + "</b>, please rate this video based on <b>" + experimentData["lingVar"] + "</b>")
    document.getElementById("instruction").innerHTML = instruction

    console.log(activeExperimentState)
    console.log(experimentData)
    console.log(settings)
    console.log(scale)
}
window.addEventListener("DOMContentLoaded", () => {
    console.log("setup happening")
    setup();
});
window.setup = setup

function start(){
    activeExperimentState.ratingElement.innerHTML = ""
    applyScale()
    activeExperimentState.ratingElement.style.visibility = "hidden"
   
    var startTime = Math.max(activeExperimentState.currentTimeStamp - (activeExperimentState.interval / 2), 0)
    console.log("start at: " + startTime)

    if(activeExperimentState.currentInterval == 0 && settings["inputAtStart"] && !intervalContained(0)){
        activateRating()
        setInterval(function () {
            if(!activeExperimentState.pendingRating){
                playVideo(startTime)
            }
        }, 500);
    }else{
        if(activeExperimentState.pendingRating){
            activateRating()
        }
        playVideo(startTime)
    }
}

function end(){
    if(settings["inputAtEnd"]){
        activateRating()
        setInterval(function () {
            if(!activeExperimentState.pendingRating){
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
        console.log("cancelled")
    }
}

function inquire_data_retention(){
    if (confirm("It appears you already have some data points saved. Do you want to keep them? \nClick 'CANCEL' to REMOVE the old data points or 'OK' to keep them. \nIf you keep your data points, we will continue the video at the last checked interval, so make sure you pick the same video file again!")){
        console.log(localStorage.getItem("experimentDataObject"))
        activeExperimentState.currentTimeStamp = parseFloat(localStorage.getItem("currentTimeStamp"))
        activeExperimentState.currentInterval = Math.floor(activeExperimentState.currentTimeStamp / activeExperimentState.interval) * activeExperimentState.interval 
        if(!intervalContained(activeExperimentState.currentInterval)){
            activeExperimentState.pendingRating = true
        }
        
        console.log(activeExperimentState)
    }else{
        experimentData["dataInputs"] = []
        localStorage.setItem("experimentDataObject", JSON.stringify(experimentData))
        localStorage.setItem("currentTimeStamp", 0)
        console.log(localStorage.getItem("experimentDataObject"))
    }
}
//__________________________________________________________________
//VIDEO SETTINGS
//__________________________________________________________________
async function setUpVideo(){
    const videoSrc = await pickSrc()

    videoContainer.innerHTML = '<video id="video_player" class="videoPlayer" type="video/mp4"></video>'
    activeExperimentState.videoElement = document.getElementById("video_player")
    activeExperimentState.videoElement.src = videoSrc + "#t=" + Math.max(activeExperimentState.currentTimeStamp - (activeExperimentState.interval / 2), 0, activeExperimentState.currentInterval)

    if(settings["pausing"]){
        activeExperimentState.videoElement.ontimeupdate = () => checkIfRatingRequired(pauseVideo)
    }else{
        activeExperimentState.videoElement.ontimeupdate = () => checkIfRatingRequired()
    }

    if(settings["controls"]){
        activeExperimentState.videoElement.setAttribute("controls", "")
    }

    if(!settings["fullscreen"]){
        activeExperimentState.videoElement.setAttribute("controlsList", "nofullscreen")
    }

    activeExperimentState.videoElement.onended = () => {
        end()
    }

    document.getElementById("soundPlayer").onended = () => {
        activeExperimentState.videoElement.volume = 1;
    }

    activeExperimentState.ratingElement.innerHTML='<div class="ratingGridDiv"><button class="bigButton" onclick="start()">start</button></div>'
}

function pickSrc(){
    return new Promise((resolve, reject) => {
        if(experimentData["dataInputs"].length > 0){
            inquire_data_retention()
        }
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = "video/mp4"
        input.style = "display: none;"
        input.onchange = () => {
            let files =   Array.from(input.files);
            chosenVideo = files[0]
            if (chosenVideo) {
                videoSrc = URL.createObjectURL(chosenVideo);
                resolve(videoSrc);
            }else{
                reject("No video file selected.");
            }
        }

        input.click();
    });
}


let pauseVideo = () => {activeExperimentState.videoElement.pause()}

function playVideo(startTime){
    activeExperimentState.videoElement.play()
    if(startTime){
        activeExperimentState.videoElement.currentTime = startTime
    }
}

//__________________________________________________________________
//RATING SETTINGS
//__________________________________________________________________
function applyScale(){
    fullScale = []
    hasLabels = false
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
    console.log(activeExperimentState.ratingElement.style.gridTemplateRows)

    
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

    timeUntilNextRating = activeExperimentState.currentInterval + activeExperimentState.interval - activeExperimentState.currentTimeStamp 
    if(activeExperimentState.pendingRating && timeUntilNextRating < 0.5){
        console.log(timeUntilNextRating)
        notRatedInTime()
    }

    timeInS = Math.floor(activeExperimentState.videoElement.currentTime)
    if(intervalContained(activeExperimentState.currentInterval)){        
        return false
    }else if(timeInS > 0 && timeInS % activeExperimentState.interval == 0 && !activeExperimentState.pendingRating){
        activateRating(pausingBehaviour)
        return true
    }
}

function notRatedInTime(){
    behaviour = settings["notRatedBehaviour"]

    if(behaviour == "pause"){
        console.log("paused due to notRatedInTime")
        pauseVideo()
    }else if(behaviour == "empty"){
        activeExperimentState.pendingRating = false
        playVideo()
    }else if(behaviour == "neutral"){
        submit(middle)
    }
}

function activateRating(pausingBehaviour = () => {}){
    console.log("rating activated")
    activeExperimentState.pendingRating = true
    activeExperimentState.currentInterval = activeExperimentState.currentInterval + activeExperimentState.interval
    pausingBehaviour()
    playSound()
    timeInS = Math.floor(activeExperimentState.videoElement.currentTime)
    activeExperimentState.ratingElement.style.visibility = "visible"
    console.log("made visible")
}

class DataPoint{
    constructor(time, interval, rating){
        this.timeOfRating = time;
        this.associatedInterval = interval;
        this.rating = rating;
    }
}

function intervalContained(interval){
    inputs = experimentData["dataInputs"]

    for (var i in inputs){
        if(inputs[i].associatedInterval == interval){
            return true
        }
    }
    return false
}  

function keyPressed(e){
    keyValue = e.key
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
    dp = new DataPoint(activeExperimentState.currentTimeStamp, activeExperimentState.currentInterval, rating)
    addDataPoint(dp)
    activeExperimentState.ratingElement.style.visibility = "hidden"
    console.log("hidden by submit")
    playVideo()
}

function addDataPoint(dp){
    inputs = experimentData["dataInputs"]

    inputs.push(dp)
    experimentData["dataInputs"] =  inputs
    localStorage.setItem("experimentDataObject", JSON.stringify(experimentData))
    
    console.log(experimentData)
    console.log(localStorage.getItem("experimentDataObject"))

    activeExperimentState.pendingRating = false
}

function playSound(){
    if(settings["sound"] == "none"){
        return
    }

    activeExperimentState.videoElement.volume = 0.7
    document.getElementById("soundPlayer").play()
}

export {
    setup,
    start,
    end,
    exitExperiment,
    setUpVideo,
    pauseVideo,
    playVideo,
    applyScale,
    activateRating,
    addDataPoint,
    submit,
    inquire_data_retention,
    checkIfRatingRequired,
    playSound,
    activeExperimentState
};