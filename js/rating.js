let videoElement, ratingElement, interval

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
    interval = parseInt(sessionStorage.getItem("interval"))

    videoElement.ontimeupdate = () => pauseVideo()
    //videoElement.onended = () => showGraph()

    
    ratingElement.onclick = () => playVideo()
    ratingElement.style.visibility = "hidden"
}

function timePointContained(time){
    for (var i in inputs){
        if(inputs[i].time == time){
            return true
        }
    }
    return false
}    
    
function pauseVideo(){
    timeInS = Math.floor(videoElement.currentTime)

    if(timeInS > 0 
        && !timePointContained(timeInS) 
        && timeInS % interval == 0){
        videoElement.pause()
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
    inputs = JSON.parse(sessionStorage.getItem("dataInputs"))
    inputs.push(dp)
    parsedInputs = JSON.stringify(inputs)
    sessionStorage.setItem("dataInputs", parsedInputs)
    console.log(sessionStorage.getItem("dataInputs"))
}

function submit(rating){
    timeInS = Math.floor(videoElement.currentTime)
    dp = new DataPoint(timeInS, rating)
    addDataPoint(dp)
    playVideo()
}


