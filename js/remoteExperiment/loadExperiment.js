async function importSettings(){
    const file = await pickFile()
    const fileContent = await readFileAsText(file);
    const content = JSON.parse(fileContent);

    if(!content.hasOwnProperty("scale") || !content.hasOwnProperty("settings") ){
        alert("The provided JSON does not contain the expected content.  Please try a different file.")
        return
    }

    document.getElementsByTagName("body")[0].style = content["theme"]
    localStorage.setItem("theme", content["theme"])

    localStorage.setItem("scaleObject", JSON.stringify(content["scale"]))
    console.log(localStorage.getItem("scaleObject"))
    localStorage.setItem("settingsObject", JSON.stringify(content["settings"]))
    console.log(localStorage.getItem("settingsObject"))

    document.getElementById("infoField").innerHTML = ""

    content["infoBox"] = ""
    if(content["infoBox"] != ""){
        createInfoBox(content["infoBox"])
    }

    var startButton = document.createElement("button")
    startButton.classList.add("startButton")
    startButton.textContent = "start Experiment"
    startButton.addEventListener("click", () => alert("Experiment would start now."));
    document.getElementById("infoField").append(startButton)

}

function pickFile(){
     return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = ".json"
        input.style = "display: none;"
        input.onchange = () => {
            let files =   Array.from(input.files);
            let chosenDoc = files[0]
            if (chosenDoc) {
                resolve(chosenDoc);
            }else{
                reject("No JSON file selected.");
            }
        }

        input.click();
    });
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

function createInfoBox(infoText){
    if(infoText == ""){
        return false
    }

    var infoBox = document.createElement("div")
    infoBox.classList.add("infoText")
    infoBox.innerHTML = infoText
    document.getElementById("infoField").append(infoBox)
}