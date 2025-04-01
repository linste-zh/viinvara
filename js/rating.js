let videoContainer, videoElement, ratingElement, interval, currentTimeStamp
pauseVideo = () => {videoElement.pause()}

function setup(){
    ratingElement = document.getElementById("ratingScale")
    interval = parseInt(localStorage.getItem("interval"))
    videoContainer = document.getElementById("videoContainer")

    console.log("interval: " + parseInt(localStorage.getItem("interval")))
    console.log("scale: " + localStorage.getItem("scale"))
    console.log("pause: " + localStorage.getItem("pausing"))
}

function submitNameAndVar(){
    userName = document.getElementById("nameField").value
    if(userName == ""){
        alert("please fill out the name field")
        return
    }
    localStorage.setItem("userName", userName)
    lingVar = document.getElementById("varField").value
    if(lingVar == ""){
        alert("please fill out the variable field")
        return
    }
    localStorage.setItem("lingVar", lingVar)
    videoContainer.innerHTML = "<button onclick='setUpVideo()'>pick source</button>"
}

function setUpVideo(){
    videoContainer.innerHTML = '<video id="video_player"><source id = "video_src" type="video/mp4"></video>'
    videoElement = document.getElementById("video_player")
    pickSrc()
    if(localStorage.getItem("pausing") == "true"){
        videoElement.ontimeupdate = () => videoInterval(pauseVideo)
    }else{
        videoElement.ontimeupdate = () => videoInterval()
    }
    videoElement.onended = () => continueResults()

    ratingElement.innerHTML='<button onclick="start()">start</button>'
}

async function pickSrc(){
    var videoSrc
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = "video/mp4"
    input.style = "display: none;"
    input.onchange = () => {
        // you can use this method to get file and perform respective operations
            let files =   Array.from(input.files);
            chosenVideo = files[0]
            if (chosenVideo) {
                videoSrc = URL.createObjectURL(chosenVideo); // Create a temporary blob URL
                videoElement.src = videoSrc
            }
        };
    input.click();
}

function start(){
    ratingElement.innerHTML = ""
    applyScale()
    ratingElement.style.visibility = "hidden"

    console.log("Playing video: " + videoElement.getAttribute("src"))
    playVideo()
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

function playVideo(){
    ratingElement.style.visibility = "hidden"
    videoElement.play()
}

function videoInterval(pausingBehaviour = () => {}){
    timeInS = Math.floor(videoElement.currentTime)

    if(timeInS > 0 
        && !timePointContained(timeInS) 
        && timeInS % interval == 0){
        pausingBehaviour()
        currentTimeStamp = timeInS
        ratingElement.style.visibility = "visible"
    }
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

function submit(rating){
    console.log("triggered")
    timeInS = Math.floor(videoElement.currentTime)
    dp = new DataPoint(currentTimeStamp, rating)
    addDataPoint(dp)
    playVideo()
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

function continueResults(){
    window.location.href="results.html"
}
