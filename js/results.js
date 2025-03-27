function showGraph(){
    inputs = localStorage.getItem("dataInputs")
    if(inputs != ""){
        inputs = JSON.parse(inputs)
    }else{
        inputs = []
    }
    xValues = []
    yValues = []
    for (var i in inputs){
        xValues.push(inputs[i].time)
        yValues.push(inputs[i].rating)
    }

    new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            //backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
          }]
        }
      });
}