function reset(){
    if (confirm("Return to start page? This will reset all your data and variables.")){
        localStorage.removeItem("experimentDataObject")
        localStorage.removeItem("scaleObject")
        localStorage.removeItem("settingsObject")

        window.location.href="index.html"
    }else{
        console.log("cancelled")
    }
}