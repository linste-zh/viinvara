document.addEventListener("DOMContentLoaded", loadHeader)

async function loadHeader(){
    header = document.getElementById("header")
    if(header.getAttribute('header-type') == "home"){
        header.innerHTML = await fetchHtmlAsText("./components/header/homeHeader.html")
    }else if(header.getAttribute('header-type') == "inex"){
        header.innerHTML = await fetchHtmlAsText("./components/header/inexHeader.html")
        document.getElementById("homeButton").addEventListener("click", reset)
        window.reset = reset
    }
}

async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

function reset(){
    if (confirm("Return to start page? This will reset all your data and variables.")){
        localStorage.removeItem("experimentDataObject")
        localStorage.removeItem("scaleObject")
        localStorage.removeItem("settingsObject")
        localStorage.removeItem("theme")

        window.location.href="index.html"
    }else{
        console.log("cancelled")
    }
}
