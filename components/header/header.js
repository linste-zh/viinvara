document.addEventListener("DOMContentLoaded", loadHeader)

window.allowLeavePage = true

async function loadHeader(){
    console.log(window.allowLeavePage)
    
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
    document.getElementById("homeButton").addEventListener("click", returnHome)
    window.returnHome = returnHome
}

async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

function returnHome(){
    window.location.href="index.html"
}

window.addEventListener("beforeunload", function(e){
    if(!window.allowLeavePage){
        console.log(window.allowLeavePage)
        e.preventDefault();
        e.returnValue = "";
    }
})

//specifically for safari
window.addEventListener("pagehide", function(e){
    if(!window.allowLeavePage){
        e.preventDefault();
        e.returnValue = "";
    }
})

