//based on https://www.w3schools.com/howto/howto_js_accordion.asp
function toggleAccordion(accButton){
    accButton.classList.toggle("active")
    for(child of accButton.children){
        child.classList.toggle("iconActive")
    }

    var accPanel = accButton.nextElementSibling
    if (accPanel.style.maxHeight) {
        accPanel.style.maxHeight = null
    } else {
        accPanel.style.maxHeight = accPanel.scrollHeight + "px"
    }
}
