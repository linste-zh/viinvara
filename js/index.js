let video, ratingScale, videoSrc
const inputs = []
timeScale = 10

class DataPoint{
    constructor(time, rating){
        this.time = time;
        this.rating = rating;
    }

    getTime(){
        return this.time
    }
    
}

DataPoint.prototype.getTime = function(){
    return this.time
}

function timePointContained(time){
    for (var i in inputs){
        if(inputs[i].time == time){
            return true
        }
    }
    return false
}
    
    
function setup(){
    //alert("setup")
    video = document.getElementById("video_player")
    ratingScale = document.getElementById("ratingScale")

    video.ontimeupdate = () => pauseVideo()
    video.onended = () => showGraph()
    //video.pause()
    
    ratingScale.onclick = () => playVideo()
    ratingScale.style.visibility = "hidden"
}

function pauseVideo(){
    timeInS = Math.floor(video.currentTime)

    if(timeInS > 0 && !timePointContained(timeInS) && timeInS % timeScale == 0){
        video.pause()
        ratingScale.style.visibility = "visible"
    }
}

function playVideo(){
    ratingScale.style.visibility = "hidden"
    video.play()
}

function start(){
    console.log("PLaying video: " + video.getAttribute("src"))
    playVideo()
}

function submit(rating){
    timeInS = Math.floor(video.currentTime)
    dp = new DataPoint(timeInS, rating)
    inputs.push(dp)
    console.log("Current Inputs: ")
    console.log(inputs)
    playVideo()
}

function showGraph(){
    xValues = []
    yValues = []
    for (var i in inputs){
        xValues.push(inputs[i].time)
        yValues.push(inputs[i].rating)
    }

    new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            //backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
          }]
        }
      });
}

function pickSrc(){
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = "video/mp4"
    input.style = "display: none;"
    input.onchange = () => {
        // you can use this method to get file and perform respective operations
            let files =   Array.from(input.files);
            chosenVideo = files[0]
            if (chosenVideo) {
                videoSrc = URL.createObjectURL(chosenVideo);
                video.src = videoSrc;
            }
        };
    input.click();
}