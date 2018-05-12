(function () {

  // Create the SVG

  var margin = { top: 0, right: 0, bottom: 0, left: 0 }

  var width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

  // You'll probably need to edit this one
  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.queue()
    .defer(d3.json, "world.topojson")
    .defer(d3.csv, "world-cities.csv")
    .await(ready)

  function ready(error, world_data, cities_data) {
    if(error) {
      console.log("Had an error, exiting")
      return
    }

    // Put your code here!

    
  }

})()






