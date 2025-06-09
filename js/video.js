import {activeExperimentState, experimentData, settings, start} from './experiment.js';
import {checkIfRatingRequired, intervalContained} from './rating.js';


async function setUpVideo(){
    const videoSrc = await pickSrc()

    activeExperimentState.videoContainer.innerHTML = '<video id="video_player" class="videoPlayer" type="video/mp4"></video>'
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

    activeExperimentState.ratingElement.innerHTML='<div class="ratingGridDiv"><button id="startButton" class="bigButton">start</button></div>'
    document.getElementById('startButton').addEventListener("click", () => {
        console.log("start button clicked")
        start()
    })
}
document.getElementById("setUpButton").addEventListener("click", () => {
    console.log("set up button clicked")
    setUpVideo();
});
window.setUpVideo = setUpVideo



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
            let chosenVideo = files[0]
            if (chosenVideo) {
                let videoSrc = URL.createObjectURL(chosenVideo);
                resolve(videoSrc);
            }else{
                reject("No video file selected.");
            }
        }

        input.click();
    });
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

let pauseVideo = () => {activeExperimentState.videoElement.pause()}

function playVideo(startTime){
    activeExperimentState.videoElement.play()
    if(startTime){
        activeExperimentState.videoElement.currentTime = startTime
    }
}

export{
    pauseVideo,
    playVideo
}