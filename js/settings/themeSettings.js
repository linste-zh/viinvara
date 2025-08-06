function setTheme(color = "blue"){
    if(color == "blue"){
        localStorage.setItem("theme", "blue")
    }else if(color == "pink"){
        localStorage.setItem("theme", "pink")
    }else if(color == "green"){
        localStorage.setItem("theme", "green")
    }else if(color == "gray"){
        localStorage.setItem("theme", "gray")
    }
    loadTheme()
}

function loadTheme(){
    let color = localStorage.getItem("theme")
    if(color == "green"){
        document.getElementsByTagName("body")[0].style = "background: linear-gradient(90deg,rgba(10,129,130,1) 0%,rgba(12,148,131,1) 16%,rgba(12,148,113,1) 34%,rgba(17,214,164,1) 50%,rgba(12,148,113,1) 66%,rgba(12,148,131,1) 84%,rgba(10,129,130,1) 100%);"
    }else if(color == "pink"){
        document.getElementsByTagName("body")[0].style = "background: linear-gradient(90deg, rgba(218,19,233,1) 0%, rgba(239,124,247,1) 16%, rgba(240,125,230,1) 34%, rgba(240,167,233,1) 50%, rgba(240,125,230,1) 66%, rgba(239,124,247,1) 84%, rgba(218,19,233,1) 100%);"
    }else if(color == "blue"){
        document.getElementsByTagName("body")[0].style = "background: linear-gradient(90deg, rgba(19,73,233,1) 0%, rgba(111,169,238,1) 16%, rgba(112,200,242,1) 34%, rgba(171,223,246,1) 50%, rgba(112,200,242,1) 66%, rgba(111,169,238,1) 84%, rgba(19,73,233,1) 100%);"
    }else if(color == "gray"){
        document.getElementsByTagName("body")[0].style = "background: linear-gradient(90deg,rgba(171,171,171,1) 0%, rgba(209,209,209,1) 16%, rgba(227,227,227,1) 34%, rgba(255,255,255,1) 50%, rgba(227,227,227,1) 66%, rgba(209,209,209,1) 84%, rgba(171,171,171,1) 100%);"
    }else{
        setTheme()
    }
}
document.addEventListener("DOMContentLoaded", loadTheme)
window.loadTheme = loadTheme

export{
    setTheme
}