//based on StackOverflow user Lucio Paiva and droduit
//https://stackoverflow.com/questions/17636528/how-do-i-load-an-html-page-in-a-div-using-javascript
document.addEventListener("DOMContentLoaded", loadSettingsAccordiong)

async function loadSettingsAccordiong() {
    const contentDiv = document.getElementById("settingsContainer")
    contentDiv.innerHTML = await fetchHtmlAsText("./components/settingsAccordion/settingsAccordion.html")
    addEventListeners()
}
async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}


import {enforceInterval, setSound, testSound, updateControlSettings, updateNoRatingSettings} from '../../js/settings/experimentSettings.js'
import {updateScale, updateLabelSettings} from '../../js/settings/scaleSettings.js'

function addEventListeners(){
    document.getElementById("interval_input").addEventListener("keyup", enforceInterval)
    window.enforceInterval = enforceInterval

    document.getElementById("notificationSound").addEventListener("change", setSound)
    window.setSound = setSound

    document.getElementById("soundIcon").addEventListener("click", testSound)
    window.testSound = testSound

    document.getElementById("vcChecker").addEventListener("change", updateControlSettings)
    window.updateControlSettings = updateControlSettings

    document.getElementById("pauseChecker").addEventListener("change", updateNoRatingSettings)
    window.updateNoRatingSettings = updateNoRatingSettings

    document.getElementById("scale_start_input").addEventListener("keyup", updateScale)
    document.getElementById("scale_start_input").addEventListener("change", updateScale)
    document.getElementById("scale_end_input").addEventListener("keyup", updateScale)
    document.getElementById("scale_end_input").addEventListener("change", updateScale)
    window.updateScale = updateScale

    document.getElementById("labelChecker").addEventListener("change", updateLabelSettings)
    window.updateLabelSettings = updateLabelSettings
}

