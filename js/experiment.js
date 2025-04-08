const activeExperimentState ={
    interval: parseInt(localStorage.getItem("interval")),
    currentTimeStamp: 0,
    pendingRating: false
    //videoContainer
    //videoElement
    //ratingElement
}

function setup(){
    activeExperimentState.videoContainer = document.getElementById("videoContainer")
    activeExperimentState.ratingElement = document.getElementById("ratingScale")

    instruction = String(localStorage.getItem("userName") + ", please rate this video based on " + localStorage.getItem("lingVar"))
    document.getElementById("instruction").innerHTML = "<h1>" + instruction + "</h1>"

    console.log("Experiment State: " + activeExperimentState)
    console.log("name: " + localStorage.getItem("userName"))
    console.log("interval: " + localStorage.getItem("lingVar"))
    console.log("interval: " + localStorage.getItem("interval"))
    console.log("scale: " + localStorage.getItem("scale"))
    console.log("pause: " + localStorage.getItem("pausing"))
    console.log("at start: " + localStorage.getItem("inputAtStart"))
    console.log("at end: " + localStorage.getItem("inputAtEnd"))
}

function start(){
    activeExperimentState.ratingElement.innerHTML = ""
    applyScale()
    activeExperimentState.ratingElement.style.visibility = "hidden"

    if(localStorage.getItem("inputAtStart")){
        activateRating()
        setInterval(function () {
            if(!activeExperimentState.pendingRating){
                playVideo()
            }
        }, 500);
    }else{
        playVideo()
    }
}

function end(){
    if(localStorage.getItem("inputAtEnd")){
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

    videoContainer.innerHTML = '<video id="video_player" class="videoPlayer"><source id = "video_src" type="video/mp4"></video>'
    activeExperimentState.videoElement = document.getElementById("video_player")
    activeExperimentState.videoElement.src = videoSrc

    if(localStorage.getItem("pausing") == "true"){
        activeExperimentState.videoElement.ontimeupdate = () => checkIfRatingRequired(pauseVideo)
    }else{
        activeExperimentState.videoElement.ontimeupdate = () => checkIfRatingRequired()
    }

    activeExperimentState.videoElement.onended = () => {
        end()
    }

    activeExperimentState.ratingElement.innerHTML='<button class="bigButton" onclick="start()">start</button>'
}

function pickSrc(){
    return new Promise((resolve, reject) => {
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

pauseVideo = () => {activeExperimentState.videoElement.pause()}

function playVideo(){
    activeExperimentState.ratingElement.style.visibility = "hidden"
    activeExperimentState.videoElement.play()
}


//__________________________________________________________________
//RATING SETTINGS
//__________________________________________________________________
function applyScale(){
    setScale = JSON.parse(localStorage.getItem("scale"))
    startNr = parseInt(setScale[0])
    endNr = parseInt(setScale[1])

    fullScale = []
    for (let i = startNr; i <= endNr; i++) {
        fullScale.push(i);
    }
    
    fullScale.forEach(nr => {
        console.log(nr)
        let button = document.createElement('button');
        button.textContent = nr;
        button.classList.add('ratingButton');
        activeExperimentState.ratingElement.appendChild(button);
        button.addEventListener("click", () => submit(nr));
    })
}

async function checkIfRatingRequired(pausingBehaviour = () => {}){
    timeInS = Math.floor(activeExperimentState.videoElement.currentTime)
    if(timePointContained(timeInS)){        //avoid duplicates
        return false
    }
    /*else if(timeInS == 0 && localStorage.getItem("inputAtStart") == "true"){   //start of video
        console.log("rating at start")
        activateRating(pauseVideo)
    }else if(timeInS == Math.floor(activeExperimentState.videoElement.duration) && localStorage.getItem("inputAtEnd") == "true"){   //end of video
        console.log("rating at end")
        activateRating(pauseVideo)
    }*/
    else if(timeInS > 0 && timeInS % activeExperimentState.interval == 0){    //interval
        console.log("rating at interval ")
        activateRating(pausingBehaviour)
    }else{
        return false
    }
    return true
    //const videoSrc = await pickSrc()
}

function activateRating(pausingBehaviour = () => {}){
    activeExperimentState.pendingRating = true
    pausingBehaviour()
    activeExperimentState.currentTimeStamp = timeInS
    activeExperimentState.ratingElement.style.visibility = "visible"
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
    inputs = localStorage.getItem("dataInputs")
    if(inputs == ""){
        return
    }
    inputs = JSON.parse(inputs)

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
    inputs = localStorage.getItem("dataInputs")
    if(inputs != ""){
        inputs = JSON.parse(inputs)
    }else{
        inputs = []
    }
    inputs.push(dp)
    parsedInputs = JSON.stringify(inputs)
    localStorage.setItem("dataInputs", parsedInputs)
    console.log(localStorage.getItem("dataInputs"))
    activeExperimentState.pendingRating = false
}
