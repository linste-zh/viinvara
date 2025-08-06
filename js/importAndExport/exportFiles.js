import {createObjects} from '../settings/settings.js'

/*partially done with ChatGPT*/
function exportMinSettings(){
    var fullSettingsObject = createObjects()
    
    if(fullSettingsObject){
        fullSettingsObject["theme"] = localStorage.getItem("theme")
        let dataStr  = JSON.stringify(fullSettingsObject)
        const blob = new Blob([dataStr], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        let currentDate = new Date()
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentDate.getFullYear()}/${currentDate.getMonth()+1}/${currentDate.getDate()}_Viinvara_ExperimentSettings.json`
        a.click();

        URL.revokeObjectURL(url);
    }else{
        alert("Could not download settings. Check if all fields are filled.")
        return false
    }
}

export{
    exportMinSettings
}