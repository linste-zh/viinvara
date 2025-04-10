const activeExperimentState ={
    currentTimeStamp: 0,
    pendingRating: false,
    interval: 60
    //videoContainer
    //videoElement
    //ratingElement
}
const experimentData = JSON.parse(localStorage.getItem("experimentDataObject"))
const scale = JSON.parse(localStorage.getItem("scaleObject"))
const settings = JSON.parse(localStorage.getItem("settingsObject"))

function setup(){
    document.getElementsByTagName("body")[0].style = localStorage.getItem("theme")
    
    activeExperimentState.videoContainer = document.getElementById("videoContainer")
    activeExperimentState.ratingElement = document.getElementById("ratingScale")

    activeExperimentState.interval = settings["interval"]

    if(settings["notRatedBehaviour"] == "neutral"){
        if(fullScale.length % 2 != 0){
            middle = fullScale[Math.floor(fullScale.length / 2)];
        }else{
            middle = fullScale[Math.floor(fullScale.length / 2)] - 0.5;
        }
        activeExperimentState.neutralRating = middle
        console.log("neutral rating: " + middle)
    }


    instruction = String(experimentData["userName"] + ", please rate this video based on " + experimentData["lingVar"])
    document.getElementById("instruction").innerHTML = "<h1>" + instruction + "</h1>"

    console.log(activeExperimentState)
    console.log(experimentData)
    console.log(settings)
    console.log(scale)
}

function start(){
    activeExperimentState.ratingElement.innerHTML = ""
    applyScale()
    activeExperimentState.ratingElement.style.visibility = "hidden"

    var startTime = 0;
    existingInputs = experimentData["dataInputs"]
    if(existingInputs.length > 0){
        lastDP = existingInputs[existingInputs.length - 1]
        startTime = lastDP["time"]
        console.log("start at: " + startTime)
    }

    if(settings["inputAtStart"] && !timePointContained(0)){
        activateRating()
        setInterval(function () {
            if(!activeExperimentState.pendingRating){
                playVideo(startTime)
            }
        }, 500);
    }else{
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

//__________________________________________________________________
//VIDEO SETTINGS
//__________________________________________________________________
async function setUpVideo(){
    const videoSrc = await pickSrc()

    videoContainer.innerHTML = `
        <video id="video_player" class="videoPlayer">
        <source id = "video_src" type="video/mp4">
        </video>`
    activeExperimentState.videoElement = document.getElementById("video_player")
    activeExperimentState.videoElement.src = videoSrc

    if(settings["pausing"]){
        activeExperimentState.videoElement.ontimeupdate = () => checkIfRatingRequired(pauseVideo)
    }else{
        activeExperimentState.videoElement.ontimeupdate = () => checkIfRatingRequired()
    }

    activeExperimentState.videoElement.onended = () => {
        end()
    }

    activeExperimentState.ratingElement.innerHTML='<div class="ratingGridDiv"><button class="bigButton" onclick="start()">start</button></div>'
}

function pickSrc(){
    return new Promise((resolve, reject) => {
        if(experimentData["dataInputs"].length > 0){
            if (confirm("It appears you already have some data points saved. Do you want to keep them? \nClick 'CANCEL' to REMOVE the old data points or 'OK' to keep them. \nIf you keep your data points, we will continue the video at the last checked interval, so make sure you pick the same video file again!")){
                console.log(localStorage.getItem("experimentDataObject"))
            }else{
                experimentData["dataInputs"] = []
                localStorage.setItem("experimentDataObject", JSON.stringify(experimentData))
                console.log(localStorage.getItem("experimentDataObject"))
            }
        }
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = "video/mp4"
        input.style = "display: none;"

        //code from ChatGPT
        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                const request = indexedDB.open("videoDB", 1);

                request.onupgradeneeded = function (e) {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains("videos")) {
                        db.createObjectStore("videos", { keyPath: "id" });
                    }
                };

                request.onsuccess = function (e) {
                    const db = e.target.result;
                    const transaction = db.transaction(["videos"], "readwrite");
                    const store = transaction.objectStore("videos");

                    const videoData = { id: "selectedVideo", file: file };
                    const addRequest = store.put(videoData);

                    addRequest.onsuccess = function () {
                        console.log("Video stored in IndexedDB.");
                        resolve("indexeddb"); // you can return a flag or ID
                    };

                    addRequest.onerror = function () {
                        reject("Failed to store video in IndexedDB.");
                    };
                };

                request.onerror = function () {
                    reject("Failed to open IndexedDB.");
                };
            } else {
                reject("No video file selected.");
            }
        };

        input.click();
    });
}

pauseVideo = () => {activeExperimentState.videoElement.pause()}

function playVideo(startTime){
    activeExperimentState.ratingElement.style.visibility = "hidden"
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
    timeUntilNextRating = activeExperimentState.currentTimeStamp + activeExperimentState.interval - activeExperimentState.videoElement.currentTime  
    if(activeExperimentState.pendingRating && timeUntilNextRating < 0.5){
        console.log(timeUntilNextRating)
        notRatedInTime()
    }

    timeInS = Math.floor(activeExperimentState.videoElement.currentTime)
    if(timePointContained(timeInS)){        
        return false
    }else if(timeInS > 0 && timeInS % activeExperimentState.interval == 0){ 
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
    activeExperimentState.pendingRating = true
    pausingBehaviour()
    activeExperimentState.currentTimeStamp = timeInS
    activeExperimentState.ratingElement.style = "visibility: visible"
}

class DataPoint{
    constructor(time, rating){
        this.time = time;
        this.rating = rating;
    }

    getTime(){
        return this.time
    }
    
}

function timePointContained(time){
    inputs = experimentData["dataInputs"]

    for (var i in inputs){
        if(inputs[i].time == time){
            return true
        }
    }
    return false
}  

function submit(rating){
    dp = new DataPoint(activeExperimentState.currentTimeStamp, rating)
    addDataPoint(dp)
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
