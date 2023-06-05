//URL 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// display default plots
function init() {
    let dropdown = d3.select("#selDataset");

    d3.json(url).then((data) => {
        console.log('Data: ${data}');

        let names = data.names;

        names.forEach((name) => {
            dropdown.append("option").text(name).property("value", name);
        });
        let name = names[0];

        demo(name);
        bar(name);
        bubble(name);
        gauge(name);
    })

}

// demographic info
function demo(SelectedValue) {
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        let metadata = data.metadata;
        
        let filteredData = metadata.filter((meta) => meta.id == SelectedValue);

        let obj = filteredData[0]
        d3.select("#sample-metadata").html("");
  
        let entries = Object.entries(obj);
        
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        console.log(entries);
    });
}

//bar chart
function bar(SelectedValue) {    
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);        
        let samples = data.samples;         
        let filteredData = samples.filter((sample) => sample.id === Selectedvalue);        
        let obj = filteredData[0];      
        
        let trace = [{            
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "rgb(166,172,237)"
            },
            orientation: "h"
        }];
        
        // Plotly 
        Plotly.newPlot("bar", trace);
    });
}

// bubble
function bubble(SelectedValue){
d3.json(url).then((data) => {
    let samples = data.samples;

    let filteredData = samples.filter((sample) => sample.id === SelectedValue);

    let obj = filteredData[0];
    
    let trace = [{
        x: obj.otu_ids,
        y: obj.sample_values,
        text: obj.otu_labels,
        mode: "markers",
        marker: {
            size: obj.sample_values,
            color: obj.otu_ids,
            colorscale: "Earth"
        }
    }];

    let layout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot("bubble", trace, layout);
});
}

//gauge chart
function gauge(SelectedValue) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        
        let filteredData = metadata.filter((meta) => meta.id == SelectedValue);
      
        let obj = filteredData[0]
            
        
        var trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
            delta: { reference: 8, increasing: { color: "blue" } },
            type: "indicator", 
            mode: "gauge+number+delta",
            gauge: {
                axis: {range: [null, 9],tickmode: "linear",tickwidth: 1, tickcolor: "darkblue" }, 
                bar: { color: "green"},

                bgcolor: "white",
          
                borderwidth: 2,
          
                bordercolor: "gray",
                steps: [
                    {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                    {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                    {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                    {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                    {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"}
                ],
                threshold: {

                    line: { color: "red", width: 4 },
            
                    thickness: 0.75,
            
                    value: 8.8
            
                  }  
            }
        }];

          });
         
         Plotly.newPlot("gauge", trace,layout_g);
    };

// toggle for new plots
function optionChanged(selectedValue) {
    demo(selectedValue);
    bar(selectedValue);
    bubble(selectedValue);
    gauge(selectedValue)
}

init();