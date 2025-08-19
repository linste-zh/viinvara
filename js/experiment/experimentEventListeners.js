import {setup, exitExperiment} from './experiment.js'

window.addEventListener("DOMContentLoaded", setup)
window.setup = setup

document.getElementById("exitButton").addEventListener("click", exitExperiment)
window.exitExperiment = exitExperiment


import {setUpVideo} from './video.js'

document.getElementById("setUpButton").addEventListener("click", setUpVideo)
window.setUpVideo = setUpVideo


window.addEventListener("beforeunload", function(e){
    if(!confirm("Are you sure you want to leave the page? This might reset your data.")){
        e.preventDefault()
    }
})

//specifically for safari
window.addEventListener("pagehide", function(e){
    if(!confirm("Are you sure you want to leave the page? This might reset your data.")){
        e.preventDefault()
    }
})