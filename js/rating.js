let videoElement, ratingElement, interval, currentTimeStamp

class DataPoint{
    constructor(time, rating){
        this.time = time;
        this.rating = rating;
    }

    getTime(){
        return this.time
    }
    
}

function setup(){
    videoElement = document.getElementById("video_player")
    ratingElement = document.getElementById("ratingScale")
    interval = parseInt(localStorage.getItem("interval"))

    if(localStorage.getItem("pausing") == "true"){
        videoElement.ontimeupdate = () => videoIntervalWithPause()
    }else{
        videoElement.ontimeupdate = () => videoIntervalWithoutPause()
    }
    videoElement.onended = () => continueResults()

    applyScale()
    //ratingElement.onclick = () => playVideo()
    ratingElement.style.visibility = "hidden"

    console.log("interval: " + parseInt(localStorage.getItem("interval")))
    console.log("scale: " + localStorage.getItem("scale"))
    console.log("pause: " + localStorage.getItem("pausing"))

    alert("test")
}

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
        /*button.classList.add('scale-button');*/
        ratingElement.appendChild(button);
        button.addEventListener("click", () => submit(nr));
    })
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
    
function videoIntervalWithPause(){
    timeInS = Math.floor(videoElement.currentTime)

    if(timeInS > 0 
        && !timePointContained(timeInS) 
        && timeInS % interval == 0){
        videoElement.pause()
        currentTimeStamp = timeInS
        ratingElement.style.visibility = "visible"
    }
}

function videoIntervalWithoutPause(){
    timeInS = Math.floor(videoElement.currentTime)

    if(timeInS > 0 
        && !timePointContained(timeInS) 
        && timeInS % interval == 0){
        currentTimeStamp = timeInS
        ratingElement.style.visibility = "visible"
    }
}

function playVideo(){
    ratingElement.style.visibility = "hidden"
    videoElement.play()
}

function start(){
    console.log("Playing video: " + videoElement.getAttribute("src"))
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
}

function submit(rating){
    console.log("triggered")
    timeInS = Math.floor(videoElement.currentTime)
    dp = new DataPoint(currentTimeStamp, rating)
    addDataPoint(dp)
    playVideo()
}

function continueResults(){
    window.location.href="results.html"
}


