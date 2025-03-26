function initialStart(){
    sessionStorage.setItem("interval", 10)
    sessionStorage.setItem("dataInputs", [])
    sessionStorage.setItem("pausing", true)
    sessionStorage.setItem("scale", [1, 9])

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