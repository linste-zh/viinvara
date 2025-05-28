//based on https://www.w3schools.com/howto/howto_js_accordion.asp
function toggleAccordion(accButton){
    accButton.classList.toggle("active")
    for(child of accButton.children){
        child.classList.toggle("iconActive")
    }

    var accPanel = accButton.nextElementSibling
    if (accPanel.style.maxHeight) {
        accPanel.style.maxHeight = null
    }else {
        accPanel.style.maxHeight = accPanel.scrollHeight + "px"
    }
}

function chooseTheme(color){
    if(color == "green"){
        localStorage.setItem("theme", "background: linear-gradient(90deg,rgba(10,129,130,1) 0%,rgba(12,148,131,1) 16%,rgba(12,148,113,1) 34%,rgba(17,214,164,1) 50%,rgba(12,148,113,1) 66%,rgba(12,148,131,1) 84%,rgba(10,129,130,1) 100%);")
    }else if(color == "pink"){
        localStorage.setItem("theme", "background: linear-gradient(90deg, rgba(218,19,233,1) 0%, rgba(239,124,247,1) 16%, rgba(240,125,230,1) 34%, rgba(240,167,233,1) 50%, rgba(240,125,230,1) 66%, rgba(239,124,247,1) 84%, rgba(218,19,233,1) 100%);")
    }else if(color == "blue"){
        localStorage.setItem("theme", "background: linear-gradient(90deg, rgba(19,73,233,1) 0%, rgba(111,169,238,1) 16%, rgba(112,200,242,1) 34%, rgba(171,223,246,1) 50%, rgba(112,200,242,1) 66%, rgba(111,169,238,1) 84%, rgba(19,73,233,1) 100%);")
    }else if(color == "gray"){
        localStorage.setItem("theme", "background: linear-gradient(90deg,rgba(171,171,171,1) 0%, rgba(209,209,209,1) 16%, rgba(227,227,227,1) 34%, rgba(255,255,255,1) 50%, rgba(227,227,227,1) 66%, rgba(209,209,209,1) 84%, rgba(171,171,171,1) 100%);")
    }
    document.getElementsByTagName("body")[0].style = localStorage.getItem("theme")
}


function openInfoBox(id){
    let background = document.createElement('div');
    background.id = 'backgroundCover';
    background.className = 'backgroundCover';
    document.getElementsByTagName('body')[0].appendChild(background);

    let infoBox = document.createElement('div');
    infoBox.id = 'infoBox';
    infoBox.className = 'infoBox';

    content = toolTipTexts[id]
    infoBox.innerHTML=`
    <div class='infoHeader'> 
        <button class='closeButton' onclick='closeInfoBox()'> &#9747; </button> 
    </div> 
    <div class='text'> ${content} </div>`
    background.appendChild(infoBox);
}

function closeInfoBox(){
    document.getElementById("backgroundCover").remove()
}

const toolTipTexts = {
    "ratingScale": "E.g. <i>-2</i> to <i>2</i> will give participants the options: <i>-2, -1, 0, 1, 2</i>.</br><b>Max. possible difference: 10</b>. Step is fixed at 1.</br>The scale will become visible beneath the videoframe at every interval time and remain until 0.5 before the next interval or until a rating is provided.",
    "labels": "If activated, the provided labels will appear beneath the corresponding scale button, e.g. <i>'Very High'</i>, <i>'Neutral'</i> ,<i>'Not at all'</i>, etc.</br>Labels can be provided for only some or for all scale points.</br> <b>Max. length: 20 characters.</b>",
    "interval" : "<b>Minimum: 1 second</b></br>",
    "ratingStart" : "If activated, the participant will have to provide a rating as 0s, i.e. before the video starts. The video will not start until a rating is provided.",
    "ratingEnd" : "If activated, the participant will have to provide a rating at the end of the video (if one is not yet provided through the interval). The page will move to the results once the rating is provided.",
    "pause" : "If activated, the video will pause at every interval and not continue until a rating is provided.",
    "sound" : "Will play whenever a rating is required from the participant. Sounds can be tested by clicking &#9654.",
    "notRated" : "If no rating is provided by user until 0.5 seconds before the next interval, either:</br>- pause video until rating is provided </br>- provide the most neutral rating available (e.g. on scale <i>-2</i> to <i>2</i> rate <i>0</i>, on scale <i>1</i> to <i>4</i> rate <i>2.5</i>)</br>- leave out datapoint entirely",
    "controls" : "If enabled, participant can pause and change the timestamp at will as in a regular video player.</br><b>This overrides any enforced pause ratings<b>.",
    "fullscreen" : "If enabled, participant can additionally enter fullcsreen mode.</br><b>This will hide the rating scale from their view.<b>."
}