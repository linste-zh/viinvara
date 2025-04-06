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
    createCSV()
    createJpeg()
}

function showGraph(){
    //var canvas = document.getElementById("resultChart");
    //var ctx = canvas.getContext("2d");

    // Draw a white background first
    //ctx.fillStyle = "white";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    new Chart("resultChart", {
        type: "line",
        data: {
          labels: timeValues,
          datasets: [{
            borderColor: "rgba(0, 0, 0, 0.47)",
            data: ratingValues
          }]
        },
        plugins: {
            beforeDraw: function (chart) {
                let ctx = chart.canvas.getContext("2d");
                ctx.fillStyle = "white"; // Set white background
                ctx.fillRect(0, 0, chart.width, chart.height);
            }
        }
      });
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

    csvLink = document.getElementById("csvLink")
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
    csvURL =  URL.createObjectURL(blob)
    csvLink.setAttribute('href', csvURL)

    currentDate = new Date()
    const fileName = `${currentDate.getYear()}/${currentDate.getMonth()+1}/${currentDate.getDate()}_${localStorage.getItem("userName")}_${localStorage.getItem("lingVar")}`
    console.log(fileName)
    csvLink.setAttribute('download', fileName)
}

function createJpeg(){
    var canvas = document.getElementById("resultChart");
    setTimeout(() => {
        var canvasUrl = canvas.toDataURL("image/jpeg");

        jpegLink = document.getElementById("jpegLink")
        jpegLink.setAttribute('href', canvasUrl)

        currentDate = new Date()
        const fileName = `${currentDate.getYear()}/${currentDate.getMonth()+1}/${currentDate.getDate()}_${localStorage.getItem("userName")}_${localStorage.getItem("lingVar")}`
        console.log("ready to download")
        jpegLink.setAttribute('download', fileName)
    }, 500)
}