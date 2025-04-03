let timeValues, ratingValues

function createData(){
    console.log("trigger createData")
    timeValues = []
    ratingValues = []
    inputs = localStorage.getItem("dataInputs")
    if(inputs != ""){
        inputs = JSON.parse(inputs)
    }else{
        inputs = []
    }

    for (var i in inputs){
        timeValues.push(inputs[i].time)
        ratingValues.push(inputs[i].rating)
    }

    showGraph()
    exportCSV()
}

function showGraph(){
    console.log("trigger showGraph")
    new Chart("myChart", {
        type: "line",
        data: {
          labels: timeValues,
          datasets: [{
            //backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0, 0, 0, 0.47)",
            data: ratingValues
          }]
        }
      });
}

function exportCSV(){
    csvURL = createCSV()

    const link = document.createElement('a')
    link.setAttribute('href', csvURL)
    link.setAttribute('download', 'File.csv')
    link.textContent = 'Click to Download CSV'

    document.getElementById('exportCSV').append(link)
}


//source: https://medium.com/@idorenyinudoh10/how-to-export-data-from-javascript-to-a-csv-file-955bdfc394a9
function createCSV(){
    inputs = localStorage.getItem("dataInputs")
    if(inputs != ""){
        inputs = JSON.parse(inputs)
    }else{
        inputs = []
    }

    //create headers
    const titleKeys = Object.keys(inputs[0])

    //add headers to dataset
    const refinedData = []
    refinedData.push(titleKeys)

    //add data to dataset
    inputs.forEach(dp => {
        refinedData.push(Object.values(dp))  
    })

    let csvContent = ''

    //turn dataset into CSV format
    refinedData.forEach(row => {
        csvContent += row.join(',') + '\n'
    })

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
    return URL.createObjectURL(blob)
}