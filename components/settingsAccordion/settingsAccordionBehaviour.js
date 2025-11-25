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


function openInfoBox(id){
    let background = document.createElement('div');
    background.id = 'backgroundCover';
    background.className = 'backgroundCover';
    document.getElementsByTagName('body')[0].appendChild(background);

    let infoBox = document.createElement('div');
    infoBox.id = 'infoBox';
    infoBox.className = 'infoBox';

    infoBox.innerHTML=`
    <div class='infoHeader'> 
        <span class="title">${toolTipTexts[id]["header"]}</span>
        <button class='closeButton' onclick='closeInfoBox()'> &#9747; </button> 
    </div> 
    <div class='text'> ${toolTipTexts[id]["text"]} </div>`
    background.appendChild(infoBox);
}

function closeInfoBox(){
    document.getElementById("backgroundCover").remove()
}

const toolTipTexts = {
    "ratingScale": {
        "header":  "Rating Scale",
        "text": "E.g. <i>-2</i> to <i>2</i> will give participants the options: <i>-2, -1, 0, 1, 2</i>.</br><b>Max. possible difference: 10</b>. Step is fixed at 1.</br>The scale will become visible beneath the videoframe at every interval time and remain until 0.5 before the next interval or until a rating is provided."
    },
    "labels": {
        "header":  "Rating Scale Labels",
        "text": "If activated, the provided labels will appear beneath the corresponding scale button, e.g. <i>'Very High'</i>, <i>'Neutral'</i> ,<i>'Not at all'</i>, etc.</br>Labels can be provided for only some or for all scale points.</br> <b>Max. length: 20 characters.</b>"
    },
    "interval": {
        "header":  "Rating Interval",
        "text": "<b>Minimum: 1 second</b></br><b>Maximum: 1 hour</b></br>"
    },
    "ratingStart": {
        "header":  "Rating at start of video",
        "text": "If activated, the participant will have to provide a rating as 0s, i.e. before the video starts. The video will not start until a rating is provided.",
    },
    "ratingEnd":{
        "header":  "Rating at end of video",
        "text":  "If activated, the participant will have to provide a rating at the end of the video (if one is not yet provided through the interval). The page will move to the results once the rating is provided.",
    },
    "pause":{
        "header":  "Pausing at interval",
        "text":  "If activated, the video will pause at every interval and not continue until a rating is provided.",
    },
    "sound":{
        "header":  "Notification Sound at interval",
        "text":  "Will play whenever a rating is required from the participant. Sounds can be tested by clicking &#9654.",
    },
    "notRated":{
        "header":  "Behaviour when rating is missed",
        "text":  "If no rating is provided by user until 0.5 seconds before the next interval, either:</br>- pause video until rating is provided </br>- provide the most neutral rating available (e.g. on scale <i>-2</i> to <i>2</i> rate <i>0</i>, on scale <i>1</i> to <i>4</i> rate <i>2.5</i>)</br>- provide the lowest rating available (e.g. on scale <i>-2</i> to <i>2</i> rate <i>-2</i>, on scale <i>1</i> to <i>4</i> rate <i>1</i>)</br>- leave out datapoint entirely",
    },
    "controls":{
        "header":  "Video Controls",
        "text":  "If enabled, participant can pause, change the timestamp at will, and enter fullscreen as in a regular video player.</br><b>This overrides any enforced pause ratings.</br></b> Interval ratings will not be repeated even on rewatch. Additionally, the fullscreen setting hides the rating buttons.</br><b>It is thus not recommended to enable this.</b>",
    }
}
