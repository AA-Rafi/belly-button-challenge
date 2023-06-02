//URL 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// display default plots
function init() {
    let dropdown = d3.select("#selDataset");

    d3.json(url).then((data) => {
        console.log('Data: ${data}');

        let names = data.names;

        names.foreach((name) => {
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
function bubble(selectedValue){}