import {createObjects} from '../settings/settings.js'

/*partially done with ChatGPT*/
function exportSettings(full = false){
    var retrievedSettingsObject = createObjects()
    
    if(retrievedSettingsObject){
        retrievedSettingsObject["theme"] = localStorage.getItem("theme")
        if(full){
            if(retrievedSettingsObject["experimentData"]["lingVar"] == ""){
                alert("The variable field must not be empty.")
                return false
            }
            retrievedSettingsObject["viinvaraFileType"] = "full"
            retrievedSettingsObject["message"] = document.getElementById("msgField").value
        }else{
            retrievedSettingsObject["viinvaraFileType"] = "min"
            retrievedSettingsObject["message"] = ""
        }
        let dataStr  = JSON.stringify(retrievedSettingsObject)
        const blob = new Blob([dataStr], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        let currentDate = new Date()
        const a = document.createElement('a');
        a.href = url;
        let docName = `Viinvara_`
        if(full){
            docName = docName.concat("FullSettingsFile")
        }else{
            docName = docName.concat("MinSettingsFile")
        }
        docName = docName.concat(`_${retrievedSettingsObject["experimentData"]["lingVar"]}`)
        if(retrievedSettingsObject["experimentData"]["userName"] != ""){
            docName = docName.concat(`_${retrievedSettingsObject["experimentData"]["userName"]}`)
        }
        console.log(docName)
        a.download = `${docName}.json`
        a.click();

        URL.revokeObjectURL(url);
        return true
    }

    alert("Could not download settings. Check if all fields are filled.")
    return false
    
}

export{
    exportSettings
}