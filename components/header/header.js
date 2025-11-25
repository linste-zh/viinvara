document.addEventListener("DOMContentLoaded", loadHeader)

async function loadHeader(){
    var header = document.getElementById("header")
    if(header.getAttribute('header-type') == "home"){
        header.innerHTML = await fetchHtmlAsText("./components/header/homeHeader.html")
        var links = header.children
        for(var i = 0;i < links.length; i++){
            if(links[i].href == window.location.href){
                links[i].classList.add("active")
            }
        }
    }else if(header.getAttribute('header-type') == "index"){
        header.innerHTML = await fetchHtmlAsText("./components/header/indexHeader.html")
    }
    document.getElementById("homeButton").addEventListener("click", reset)
    window.reset = reset
}

async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

function reset(){
    if (confirm("Return to start page? This will reset all your data and settings.")){
        localStorage.removeItem("experimentDataObject")
        localStorage.removeItem("scaleObject")
        localStorage.removeItem("settingsObject")
        localStorage.removeItem("theme")

        window.location.href="index.html"
    }else{
        console.log("cancelled")
    }
}
