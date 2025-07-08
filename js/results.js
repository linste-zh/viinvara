const intervalValues = []
const timestampValues = []
const ratingValues = []
const experimentData = JSON.parse(localStorage.getItem("experimentDataObject"))
const scale = JSON.parse(localStorage.getItem("scaleObject"))
var videoShown = false
var videoPicked = false
var timeStamp = 0
var chart



function setUp(){
    console.log("setup is happening")
    document.getElementsByTagName("body")[0].style = localStorage.getItem("theme")

    inputs = experimentData["dataInputs"]
    console.log(experimentData["dataInputs"])

    for (var i in inputs){
        intervalValues.push(inputs[i].associatedInterval)
        timestampValues.push(inputs[i].timeOfRating)
        ratingValues.push(inputs[i].rating)
    }
    console.log(intervalValues)
    console.log(timestampValues)
    console.log(ratingValues)

    document.getElementById("videoContainer").style.display = "none"


    showGraph()
    //createCSV()
    //createJpeg()
}

function showGraph(){
    if (chart) {
        chart.destroy();
    }

    var middle_rating = scale[Math.floor(Object.values(scale).length / 2)]

    if(Object.values(scale).length % 2 != 0){
        middle = middle_rating["value"];
    }else{
        middle = middle_rating["value"] - 0.5;
    }

    //largely done via ChatGPT
    Chart.register(
        window['chartjs-plugin-annotation'],
        Chart.LineController,
        Chart.LineElement,
        Chart.PointElement,
        Chart.LinearScale,
        Chart.TimeScale,
        Chart.CategoryScale,
        Chart.Title,
        Chart.Tooltip,
        Chart.Legend
    );    

    Chart.register({
        id: 'whiteBackground',
        beforeDraw(chart) {
            const ctx = chart.canvas.getContext("2d");
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, chart.width, chart.height);
        }
    });


    const ctx = document.getElementById("resultChart").getContext('2d')
    chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: intervalValues,
          datasets: [{
            label: experimentData["userName"] + " rating " + experimentData["lingVar"],
            borderColor: "rgba(0, 0, 0, 0.47)",
            data: timestampValues.map((t, i) => ({ x: t, y: ratingValues[i] })),
            fill: true,
            clip: false,
          }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: 0,
                    max: intervalValues[intervalValues.length - 1]
                },
                y: {
                    min: scale[0]["value"],
                    max: scale[Object.values(scale).length - 1]["value"],
                    ticks: {
                        stepSize: 1,
                    },
                    grid: {
                        drawBorder: false
                    },
                    offset: true,
                }
            },
            events: ['mousemove', 'mouseout', 'click'],
            onClick: function(e, elements, chart) {
                const canvasPosition = Chart.helpers.getRelativePosition(e, chart);
                const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);

                timeStamp = dataX
                chart.options.plugins.annotation.annotations.timestampLine.value = timeStamp;
                chart.update()

                if (videoShown && videoPicked) {
                    document.getElementById('video_player').currentTime = timeStamp;
                }
            },
            onmousenter: function (e, item) {
                console.log("entered")
                //chart.options.plugins.annotation.annotations.hoverLine.display = true;
                chart.update()
            },
            onmouseleave: function (e, item) {
                console.log("left")
                //chart.options.plugins.annotation.annotations.hoverLine.display = false;
                chart.update()
            },
            onHover: function (e, item) {
                const canvasPosition = Chart.helpers.getRelativePosition(e, chart);
                const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);

                hoverTime = dataX
                //chart.options.plugins.annotation.annotations.hoverLine.display = true;
                //chart.options.plugins.annotation.annotations.hoverLine.value = hoverTime;
                chart.update()
            },
            plugins: {
                annotation: {
                    interaction: {
                        mode: 'x',
                        intersect: false
                    },
                    events: ["click"],
                    annotations: {
                        middleLine: {
                            type: "line",
                            yMin: middle,
                            yMax: middle,
                            borderColor: "black",
                            borderWidth: 2
                        },
                        timestampLine: {
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x',
                            value: timeStamp,
                            borderColor: '#74d4f8',
                            borderWidth: 1.5,
                            display: false
                            /*label: {
                                display: true,
                                content: '<>',
                                position: 'start'
                            }*/
                        },
                        /*hoverLine: {
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x',
                            value: timeStamp,
                            borderColor: 'red',
                            borderWidth: 2,
                            borderDash: [5, 15]
                        }*/
                    }
                }
            }
        }
    })

    /*setInterval(() => {
        chart.update()
        console.log("chart updated")
    }, 500)*/
}

function playVideo(time){
    if(videoShown){
        document.getElementById("video_player").play()
        document.getElementById("video_player").currentTime = time;
    }
}

//source: https://medium.com/@idorenyinudoh10/how-to-export-data-from-javascript-to-a-csv-file-955bdfc394a9
function createCSV(){
    inputs = experimentData["dataInputs"]

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
    const fileName = `${currentDate.getFullYear()}/${currentDate.getMonth()+1}/${currentDate.getDate()}_${experimentData["userName"]}_${experimentData["lingVar"]}`
    //console.log(fileName)
    csvLink.setAttribute('download', fileName)
}

function createJpeg(){
    var canvas = document.getElementById("resultChart");
    setTimeout(() => {
        var canvasUrl = canvas.toDataURL("image/jpeg");

        jpegLink = document.getElementById("jpegLink")
        jpegLink.setAttribute('href', canvasUrl)

        currentDate = new Date()
        const fileName = `${currentDate.getFullYear()}/${currentDate.getMonth()+1}/${currentDate.getDate()}_${experimentData["userName"]}_${experimentData["lingVar"]}`
        jpegLink.setAttribute('download', fileName)
    }, 500)
}

function toggleVideo(){
    document.getElementById("videoArrow").classList.toggle("active")
    videoContainer = document.getElementById("videoContainer")


    if(videoContainer.style.display == "none"){
        document.getElementById("showVideoText").innerHTML = "Hide Video"
        videoContainer.style.display = "flex"
        chart.options.plugins.annotation.annotations.timestampLine.display = true
        document.getElementById("resultsGrid").style.gridTemplateColumns = "1.5fr 1fr"
        videoShown = true
        
    }else{
        document.getElementById("showVideoText").innerHTML = "Show Video"
        if(videoPicked){document.getElementById("video_player").pause()}
        videoContainer.style.display = "none"
        chart.options.plugins.annotation.annotations.timestampLine.display = false
        document.getElementById("resultsGrid").style.gridTemplateColumns = "1fr auto"
        videoShown = false
    }
    refresh()
}


async function setUpVideo(){
    const videoSrc = await pickSrc()

    videoContainer.innerHTML = '<video controls id="video_player" class="videoPlayer"><source id = "video_src" type="video/mp4"></video>'
    document.getElementById("video_player")
    document.getElementById("video_player").src = videoSrc + "#t=" + timeStamp

    document.getElementById("video_player").ontimeupdate  = () => {
        timeStamp = document.getElementById("video_player").currentTime
        
        chart.options.plugins.annotation.annotations.timestampLine.value = timeStamp;
        chart.update()
    }
}

function pickSrc(){
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = "video/mp4"
        input.style = "display: none;"
        input.onchange = () => {
            let files =   Array.from(input.files);
            chosenVideo = files[0]
            if (chosenVideo) {
                videoSrc = URL.createObjectURL(chosenVideo);
                videoPicked = true
                resolve(videoSrc);
            }else{
                reject("No video file selected.");
            }
        }

        input.click();
    });
}

function refresh(){
    chart.resize();
}