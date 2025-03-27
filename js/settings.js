function initialStart(){
    interval = document.getElementById("interval_input").value
    alert("interval: " + interval)
    localStorage.setItem("interval", interval)

    localStorage.setItem("dataInputs", "")

    scale_start = document.getElementById("scale_start_input").value
    scale_end = document.getElementById("scale_end_input").value
    scale = [scale_start, scale_end]
    localStorage.setItem("scale", JSON.stringify(scale))

    console.log("interval: " + localStorage.getItem("interval"))
    console.log("scale: " + localStorage.getItem("scale"))
    console.log("pause: " + localStorage.getItem("pausing"))

    window.location.href="experiment.html"
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
                let videoSrc = URL.createObjectURL(chosenVideo); // Create a temporary blob URL
                videoElement.src = videoSrc
            }
        };
    input.click();
}

function enforceInterval(el){
    
}

function enforceScale(el){

}

function pauseCheck(el){
    if(el.value == "true"){
        localStorage.setItem("pausing", true)
    }else{
        localStorage.setItem("pausing", false)
    }
}

function reset(){
    localStorage.removeItem("interval")
    localStorage.removeItem("scale")
    localStorage.removeItem("pausing")
    localStorage.removeItem("dataInputs")

    window.location.href="index.html"
}